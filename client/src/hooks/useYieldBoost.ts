import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import {useAccount, useBalance, useWriteContract} from "wagmi";
import {readContract} from "@wagmi/core";
import StakingVaultABI from "../abi/StakingVault.json";
import TokenABI from "../abi/Token.json";
import {appConfig} from "@/config.ts";
import {formatUnits, parseUnits} from "viem";
import {waitForTransactionReceipt} from "wagmi/actions";
import {wagmiConfig} from "@/providers/Web3Provider.tsx";
import {harmonyOne} from "wagmi/chains";
import useDebounce from "@/hooks/useDebounce.ts";

export function useYieldBoost() {
  const [amount, setAmount] = useState("");
  const [previewAmount, setPreviewAmount] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const { toast } = useToast();
  const { writeContractAsync } = useWriteContract()
  const { address: userAddress, isConnected } = useAccount()
  const debouncedAmount = useDebounce(amount)

  const { data: tokenBalance } = useBalance({
    token: appConfig.sDaiTokenAddress as `0x${string}`,
    address: userAddress,
    chainId: harmonyOne.id,
    query: {
      refetchInterval: 1000
    }
  })

  const { data: sharesBalance } = useBalance({
    token: appConfig.stakingVaultAddress as `0x${string}`,
    address: userAddress,
    chainId: harmonyOne.id,
    query: {
      refetchInterval: 1000
    }
  })

  useEffect(() => {
    const updatePreviewAmount = async () => {
      try {
        const amountParsed = parseUnits(debouncedAmount.toString(), 18)
        const functionName = activeTab === 'deposit'
          ? 'previewDeposit'
          : 'previewRedeem'
        const estimateValue = await readContract(wagmiConfig, {
          abi: StakingVaultABI,
          address: appConfig.stakingVaultAddress as `0x${string}`,
          functionName,
          args: [amountParsed]
        }) as bigint
        const estimateValueNumber = formatUnits(estimateValue, 18)
        setPreviewAmount(Number(estimateValueNumber))
      } catch (e) {
        console.error('Failed to get preview amount', e);
      }
    }
    if(debouncedAmount && debouncedAmount !== '0') {
      updatePreviewAmount()
    } else {
      setPreviewAmount(null)
    }
  }, [debouncedAmount, activeTab]);

  const handleBoostYield = async () => {
    try {
      const amountParsed = parseUnits(amount.toString(), 18)

      const allowance = await readContract(wagmiConfig, {
        abi: TokenABI as never,
        address: appConfig.sDaiTokenAddress as `0x${string}`,
        functionName: 'allowance',
        args: [userAddress, appConfig.stakingVaultAddress]
      }) as bigint
      console.log('Allowance:', allowance)

      if(amountParsed > allowance) {
        const approveHash = await writeContractAsync({
          abi: TokenABI as never,
          address: appConfig.sDaiTokenAddress as `0x${string}`,
          functionName: 'approve',
          args: [appConfig.stakingVaultAddress, amountParsed],
        })
        console.log('approveHash', approveHash)
        await waitForTransactionReceipt(wagmiConfig, { hash: approveHash })
      }

      const depositHash = await writeContractAsync({
        abi: StakingVaultABI,
        address: appConfig.stakingVaultAddress as `0x${string}`,
        functionName: 'deposit',
        args: [amountParsed, userAddress],
      })
      console.log('Deposit txnHash:', depositHash)
      await waitForTransactionReceipt(wagmiConfig, { hash: depositHash })
      toast({
        title: "Yield Boosted",
        description: `${amount} 1sDAI is now earning boosted yield.`,
      });
      setAmount('')
    } catch (e) {
      console.error('Failed to deposit:', e);
    }
  }

  const handleWithdraw = async () => {
    try {
      const amountParsed = parseUnits(amount.toString(), 18)
      const withdrawHash = await writeContractAsync({
        abi: StakingVaultABI,
        address: appConfig.stakingVaultAddress as `0x${string}`,
        functionName: 'redeem',
        args: [amountParsed, userAddress, userAddress],
      })
      console.log('Withdraw txnHash:', withdrawHash)
      await waitForTransactionReceipt(wagmiConfig, { hash: withdrawHash })
      toast({
        title: "Withdrawal Successful",
        description: `${amount} 1sDAI has been returned to your available balance.`,
      });
      setAmount("");
    } catch(e) {
      console.error('Failed to withdraw:', e);
    }
  }

  // const handleBoostYield = useCallback(() => {
  //   const depositAmount = parseFloat(amount);
  //   if (!isNaN(depositAmount) && depositAmount <= availableBalance) {
  //     const withFee = depositAmount * (1 - DEPOSIT_FEE);
  //     const boostedValue = withFee / EXCHANGE_RATE;
  //     setBoostedAmount((prev) => (prev || 0) + boostedValue);
  //     setAvailableBalance((prev) => prev - depositAmount);
  //     toast({
  //       title: "Yield Boosted",
  //       description: `${formatToken(boostedValue, 'boostDAI')} is now earning boosted yield.`,
  //     });
  //     setAmount("");
  //   } else {
  //     toast({
  //       title: "Invalid Amount",
  //       description: "Please enter a valid amount within your available balance.",
  //       variant: "destructive",
  //     });
  //   }
  // }, [amount, availableBalance, toast]);

  // const handleWithdraw = useCallback(() => {
  //   const withdrawAmount = parseFloat(amount);
  //   if (!isNaN(withdrawAmount) && boostedAmount !== null && withdrawAmount <= boostedAmount) {
  //     const baseAmount = withdrawAmount * EXCHANGE_RATE;
  //     const withFee = baseAmount * (1 - WITHDRAWAL_FEE);
  //     setBoostedAmount((prev) => (prev || 0) - withdrawAmount);
  //     // setAvailableBalance((prev) => prev + withFee);
  //     toast({
  //       title: "Withdrawal Successful",
  //       description: `${formatToken(withFee, '1sDAI')} has been returned to your available balance.`,
  //     });
  //     setAmount("");
  //   } else {
  //     toast({
  //       title: "Invalid Amount",
  //       description: "Please enter a valid amount within your boosted balance.",
  //       variant: "destructive",
  //     });
  //   }
  // }, [amount, boostedAmount, toast]);

  const availableBalance = (tokenBalance ? +tokenBalance?.formatted : 0)
  const boostedAmount = (sharesBalance ? +sharesBalance?.formatted : 0)

  return {
    isConnected,
    amount,
    setAmount,
    availableBalance,
    boostedAmount,
    previewAmount,
    activeTab,
    setActiveTab,
    handleBoostYield,
    handleWithdraw,
  };
}
