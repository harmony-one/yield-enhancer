import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useWallet } from './use-wallet';
import { EXCHANGE_RATE, DEPOSIT_FEE, WITHDRAWAL_FEE } from '@/lib/constants';
import { formatToken } from '@/lib/format';
import {useAccount, useWriteContract} from "wagmi";
import StakingVaultABI from "../abi/StakingVault.json";
import TokenABI from "../abi/Token.json";
import {appConfig} from "@/config.ts";
import {parseUnits} from "viem";
import {waitForTransactionReceipt} from "wagmi/actions";
import {wagmiConfig} from "@/providers/Web3Provider.tsx";

export function useYieldBoost() {
  const { isConnected } = useWallet();
  const [amount, setAmount] = useState("");
  const [availableBalance, setAvailableBalance] = useState(28394.48);
  const [boostedAmount, setBoostedAmount] = useState<number | null>(null);
  const [previewAmount, setPreviewAmount] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const { toast } = useToast();
  const { writeContractAsync } = useWriteContract()
  const { address: userAddress } = useAccount()

  const calculatePreview = useCallback((inputAmount: string, mode: 'deposit' | 'withdraw') => {
    const parsed = parseFloat(inputAmount);
    if (!isNaN(parsed)) {
      if (mode === 'deposit') {
        // Converting 1sDAI to boostDAI
        const withFee = parsed * (1 - DEPOSIT_FEE);
        return withFee / EXCHANGE_RATE;
      } else {
        // Converting boostDAI to 1sDAI
        const baseAmount = parsed * EXCHANGE_RATE;
        return baseAmount * (1 - WITHDRAWAL_FEE);
      }
    }
    return null;
  }, []);

  useEffect(() => {
    setPreviewAmount(calculatePreview(amount, activeTab));
  }, [amount, calculatePreview, activeTab]);

  const handleBoostYield = async () => {
    try {

      const amountParsed = parseUnits(amount.toString(), 18)

      const approveHash = await writeContractAsync({
        abi: TokenABI as never,
        address: appConfig.sDaiTokenAddress as `0x${string}`,
        functionName: 'approve',
        args: [appConfig.stakingVaultAddress, amountParsed],
      })

      console.log('approveHash', approveHash)
      await waitForTransactionReceipt(wagmiConfig, { hash: approveHash })

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
      console.error('Failed to boost:', e);
    }
  }

  const OldhandleBoostYield = useCallback(() => {
    const depositAmount = parseFloat(amount);
    if (!isNaN(depositAmount) && depositAmount <= availableBalance) {
      const withFee = depositAmount * (1 - DEPOSIT_FEE);
      const boostedValue = withFee / EXCHANGE_RATE;
      setBoostedAmount((prev) => (prev || 0) + boostedValue);
      setAvailableBalance((prev) => prev - depositAmount);
      toast({
        title: "Yield Boosted",
        description: `${formatToken(boostedValue, 'boostDAI')} is now earning boosted yield.`,
      });
      setAmount("");
    } else {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount within your available balance.",
        variant: "destructive",
      });
    }
  }, [amount, availableBalance, toast]);

  const handleWithdraw = useCallback(() => {
    const withdrawAmount = parseFloat(amount);
    if (!isNaN(withdrawAmount) && boostedAmount !== null && withdrawAmount <= boostedAmount) {
      const baseAmount = withdrawAmount * EXCHANGE_RATE;
      const withFee = baseAmount * (1 - WITHDRAWAL_FEE);
      setBoostedAmount((prev) => (prev || 0) - withdrawAmount);
      setAvailableBalance((prev) => prev + withFee);
      toast({
        title: "Withdrawal Successful",
        description: `${formatToken(withFee, '1sDAI')} has been returned to your available balance.`,
      });
      setAmount("");
    } else {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount within your boosted balance.",
        variant: "destructive",
      });
    }
  }, [amount, boostedAmount, toast]);

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
