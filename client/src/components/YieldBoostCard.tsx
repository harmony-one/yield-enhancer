import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BalanceCard } from "./BalanceCard";
import { YieldTabs } from "./YieldTabs";
import { HowItWorksDialog } from "./HowItWorksDialog";
import { formatNumber } from "@/lib/utils";
import {useState} from "react";
import usePoller from "@/hooks/usePoller.ts";
import useActiveTab from "@/hooks/useActiveTab.ts";
import {readContract} from "@wagmi/core";
import {wagmiConfig} from "@/providers/Web3Provider.tsx";
import StakingVaultABI from "@/abi/StakingVault.json";
import {appConfig} from "@/config.ts";
import {formatUnits} from "viem";

interface YieldBoostCardProps {
  availableBalance: number;
  boostedAmount: number | null;
  amount: string;
  onAmountChange: (value: string) => void;
  onMaxClick: () => void;
  onBoost: () => void;
  onWithdraw: () => void;
  previewAmount: number | null;
  currentAPY: number;
  onTabChange: (tab: 'deposit' | 'withdraw') => void;
}

export function YieldBoostCard({
  availableBalance,
  boostedAmount,
  amount,
  onAmountChange,
  onMaxClick,
  onBoost,
  onWithdraw,
  previewAmount,
  currentAPY,
  onTabChange,
}: YieldBoostCardProps) {
  const isTabActive = useActiveTab()
  const [isLoading, setIsLoading] = useState(false)
  const [tvl, setTvl] = useState<number>(0);

  const updateTvl = async () => {
    try {
      setIsLoading(true)
      const data = await readContract(wagmiConfig, {
        abi: StakingVaultABI,
        address: appConfig.stakingVaultAddress as `0x${string}`,
        functionName: 'totalAssets',
        args: []
      }) as bigint
      const tvlValue = formatUnits(data, 18)
      setTvl(+tvlValue)
    } catch (e) {
      console.error('Failed to update TVL', e)
    } finally {
      setIsLoading(false)
    }
  }

  usePoller(() => {
    if(isTabActive && !isLoading) {
      updateTvl();
    }
  }, 3 * 1000)

  return (
    <Card className="bg-[#1A1A1A]/80 backdrop-blur-sm border-cyan-500/20 text-white">
      <CardContent className="p-6 space-y-6">
        <BalanceCard
          availableBalance={availableBalance}
          boostedAmount={boostedAmount}
          currentAPY={currentAPY}
        />

        <YieldTabs
          amount={amount}
          onAmountChange={onAmountChange}
          onMaxClick={onMaxClick}
          onBoost={onBoost}
          onWithdraw={onWithdraw}
          previewAmount={previewAmount}
          boostedAmount={boostedAmount}
          onTabChange={onTabChange}
        />

        <div className="flex justify-center">
          <HowItWorksDialog />
        </div>
      </CardContent>

      <CardFooter className="border-t border-white/10 pt-6">
        <div className="w-full text-center space-y-1">
          <p className="text-sm text-gray-400">TVL</p>
          <p className="font-semibold">{formatNumber(tvl)} 1sDAI</p>
        </div>
      </CardFooter>
    </Card>
  );
}
