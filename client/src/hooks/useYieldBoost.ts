import {useState, useEffect, useMemo} from 'react';
import { useToast } from "@/components/ui/use-toast";
import {useAccount, useBalance, useWriteContract} from "wagmi";
import {readContract, getBlock, GetBlockReturnType} from "@wagmi/core";
import StakingVaultABI from "../abi/StakingVault.json";
import TokenABI from "../abi/Token.json";
import {appConfig} from "@/config.ts";
import {formatUnits, parseUnits} from "viem";
import {waitForTransactionReceipt, switchChain} from "wagmi/actions";
import {wagmiConfig} from "@/providers/Web3Provider.tsx";
import {harmonyOne} from "wagmi/chains";
import useDebounce from "@/hooks/useDebounce.ts";
import usePoller from "@/hooks/usePoller.ts";
import useActiveTab from "@/hooks/useActiveTab.ts";
import {getRewardsInfo, VaultRewardsInfo} from "@/api";
import Decimal from "decimal.js";

export interface VaultData {
  vaultCreateTimestamp: bigint
  totalAssets: bigint
  totalSupply: bigint
  rewardsInfo?: VaultRewardsInfo
}

const defaultVaultData: VaultData = {
  vaultCreateTimestamp: 0n,
  totalAssets: 0n,
  totalSupply: 0n,
}

export function useYieldBoost() {
  const [amount, setAmount] = useState("");
  const [previewAmount, setPreviewAmount] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [vaultData, setVaultData] = useState(defaultVaultData)
  const [inProgress, setInProgress] = useState(false);

  const isTabActive = useActiveTab()
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
      setInProgress(true)
      await switchChain(wagmiConfig, { chainId: harmonyOne.id })
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
    } finally {
      setInProgress(false)
    }
  }

  const handleWithdraw = async () => {
    try {
      setInProgress(true)
      await switchChain(wagmiConfig, { chainId: harmonyOne.id })
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
    } finally {
      setInProgress(false)
    }
  }

  const updateVaultData = async () => {
    try {
      const [
        rewardsInfo,
        vaultInitBlock,
        totalAssets,
        totalSupply
      ] = await Promise.all([
        getRewardsInfo(),
        getBlock(wagmiConfig, { blockNumber: appConfig.stakingVaultLaunchBlock, chainId: harmonyOne.id }),
        readContract(wagmiConfig, {
          abi: StakingVaultABI,
          address: appConfig.stakingVaultAddress as `0x${string}`,
          functionName: 'totalAssets',
          args: [],
          chainId: harmonyOne.id,
        }),
        readContract(wagmiConfig, {
          abi: StakingVaultABI,
          address: appConfig.stakingVaultAddress as `0x${string}`,
          functionName: 'totalSupply',
          args: [],
          chainId: harmonyOne.id,
        })
      ]) as [VaultRewardsInfo, GetBlockReturnType, bigint, bigint]

      setVaultData({
        vaultCreateTimestamp: vaultInitBlock.timestamp,
        totalSupply,
        totalAssets,
        rewardsInfo
      })
    } catch (e) {
      console.error('Failed to update vault data:', e);
    }
  }

  usePoller(() => {
    if(isTabActive) {
      updateVaultData()
    }
  }, 3 * 1000)

  /*
  Share price at t0 = totalAssets at T0 / totalSupply at T0
  Share price at t1 = totalAssets at T1 / totalSupply at T1
  Interest Rate = (Share price at t0 / Share price at t1) - 1
  Time Delta = days since vault launch / 365
  APY = (1 + Interest Rate) ^ (Time Delta) - 1
  * */

  const currentAPY = useMemo(() => {
    if(vaultData.vaultCreateTimestamp > 0n) {
      const daysSinceVaultLaunch = Math.floor((
        Math.round(Date.now() / 1000) - Number(vaultData.vaultCreateTimestamp)
      ) / (24 * 60 * 60))

      if(daysSinceVaultLaunch >= 0) {
        // const initialSharePrice = INITIAL_EXCHANGE_RATE
        // const currentSharePrice = vaultData.totalSupply !== 0n
        //   ? Number(vaultData.totalAssets) / Number(vaultData.totalSupply)
        //   : 0
        //
        // const interestRate = (currentSharePrice / initialSharePrice) - 1
        // const historicalApy = Math.pow(
        //   (1 + interestRate), daysSinceVaultLaunch / 365
        // ) - 1

        let activeAPY = 0
        // (current 1sDAI yield + (current 1sDAI streamed per day from reward contract)*365/Current TVL*100))
        if(vaultData.rewardsInfo) {
          const { sync } = vaultData.rewardsInfo
          const epochDuration = Number(sync.epochDuration)
          const rewardsPerEpoch = new Decimal(sync.rewardsPerEpoch).div(10 ** 18).toNumber()
          const secondsInAnHour = 60 * 60;

          const hoursInEpoch = epochDuration < secondsInAnHour ? 1 : epochDuration / secondsInAnHour;
          const epochsPerHour = hoursInEpoch === 1 ? secondsInAnHour / epochDuration : 1 / hoursInEpoch;
          const hourlyRewards = (rewardsPerEpoch / hoursInEpoch) * epochsPerHour;
          const dailyReward = 24 * hourlyRewards

          const tvl = new Decimal(String(vaultData.totalAssets)).div(10 ** 18).toNumber()
          activeAPY = dailyReward * 365 / tvl
        }

        return ((activeAPY) * 100).toFixed(2)
      }
    }
    return '0'
  }, [vaultData])

  return {
    isConnected,
    amount,
    setAmount,
    availableBalance: tokenBalance ? tokenBalance?.formatted : '0',
    boostedAmount: sharesBalance ? sharesBalance?.formatted : '0',
    previewAmount,
    activeTab,
    setActiveTab,
    handleBoostYield,
    handleWithdraw,
    currentAPY,
    vaultData,
    inProgress
  };
}
