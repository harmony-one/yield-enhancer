import { PiggyBank, TrendingUp } from 'lucide-react';
import { formatNumber } from "@/lib/utils";

interface BalanceCardProps {
  availableBalance: number;
  boostedAmount: number | null;
  currentAPY: string;
}

export function BalanceCard({ availableBalance, boostedAmount, currentAPY }: BalanceCardProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-xl bg-black/40 border border-cyan-500/20 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <PiggyBank className="h-5 w-5 text-cyan-400" />
          <span className="font-semibold">Available Balance</span>
        </div>
        <p className="text-2xl font-bold">{formatNumber(availableBalance)} 1sDAI</p>
      </div>

      {boostedAmount !== null && boostedAmount > 0 ? (
        <div className="rounded-xl bg-gradient-to-br from-[#7FF4E3]/10 to-[#7FF4E3]/5 border border-[#7FF4E3]/20 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#7FF4E3]" />
            <span className="font-semibold bg-gradient-to-r from-[#7FF4E3] to-cyan-400 bg-clip-text text-transparent">
              Earning Boosted Yield
            </span>
          </div>
          <p className="text-2xl font-bold">{formatNumber(boostedAmount)} boostDAI</p>
          <p className="text-sm font-semibold text-[#7FF4E3]">{currentAPY}% APY</p>
        </div>
      ) : (
        <div className="rounded-xl bg-black/40 relative overflow-hidden h-[104px] flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-[#7FF4E3]/40 rounded-xl"></div>
          <div className="relative z-10 flex flex-col items-center justify-center space-y-2 px-4">
            <p className="text-sm text-center text-gray-400">
              Boost your yield to start earning!
            </p>
            <p className="text-2xl font-bold text-[#7FF4E3]">
              {currentAPY}% APY
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
