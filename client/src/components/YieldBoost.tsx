import { Header } from './Header';
import { YieldBoostCard } from './YieldBoostCard';
import { useYieldBoost } from '@/hooks/useYieldBoost';
import { CURRENT_APY } from '@/lib/constants';

export default function YieldBoost() {
  const {
    amount,
    setAmount,
    availableBalance,
    boostedAmount,
    previewAmount,
    handleBoostYield,
    handleWithdraw,
    setActiveTab,
  } = useYieldBoost();

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Header />

      <div className="max-w-[1400px] mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-8">Simple. DeFi.</h1>
        
        <div className="w-full max-w-xl mx-auto">
          <YieldBoostCard
            availableBalance={availableBalance}
            boostedAmount={boostedAmount}
            amount={amount}
            onAmountChange={setAmount}
            onMaxClick={() => setAmount(availableBalance.toString())}
            onBoost={handleBoostYield}
            onWithdraw={handleWithdraw}
            previewAmount={previewAmount}
            currentAPY={CURRENT_APY}
            onTabChange={setActiveTab}
          />

          <p className="text-sm text-center text-gray-400 mt-4">
            *0.1% fee for deposits and withdrawals
          </p>
        </div>
      </div>
    </div>
  );
}