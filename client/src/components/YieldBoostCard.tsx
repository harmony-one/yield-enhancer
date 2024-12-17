import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BalanceCard } from "./BalanceCard";
import { YieldTabs } from "./YieldTabs";
import { HowItWorksDialog } from "./HowItWorksDialog";
import { TVL } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

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
          <p className="font-semibold">{formatNumber(TVL)} 1sDAI</p>
        </div>
      </CardFooter>
    </Card>
  );
}