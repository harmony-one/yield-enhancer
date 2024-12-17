import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from 'lucide-react';
import { formatNumber } from "@/lib/utils";

interface YieldTabsProps {
  amount: string;
  onAmountChange: (value: string) => void;
  onMaxClick: () => void;
  onBoost: () => void;
  onWithdraw: () => void;
  previewAmount: number | null;
  boostedAmount: number | null;
  onTabChange: (tab: 'deposit' | 'withdraw') => void;
}

export function YieldTabs({
  amount,
  onAmountChange,
  onMaxClick,
  onBoost,
  onWithdraw,
  previewAmount,
  boostedAmount,
  onTabChange,
}: YieldTabsProps) {
  return (
    <Tabs 
      defaultValue="deposit" 
      className="w-full"
      onValueChange={(value) => onTabChange(value as 'deposit' | 'withdraw')}
    >
      <TabsList className="grid w-full grid-cols-2 bg-black/40">
        <TabsTrigger value="deposit" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
          Deposit
        </TabsTrigger>
        <TabsTrigger value="withdraw" className="data-[state=active]:bg-[#7FF4E3] data-[state=active]:text-black">
          Withdraw
        </TabsTrigger>
      </TabsList>

      <TabsContent value="deposit" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="deposit-amount">Amount (1sDAI)</Label>
          <div className="relative">
            <Input
              id="deposit-amount"
              placeholder="0.00000"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              className="text-lg py-5 bg-black/40 border-cyan-500/20 text-white"
            />
            <Button
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-auto py-1 text-cyan-400 hover:text-cyan-300"
              onClick={onMaxClick}
            >
              max
            </Button>
          </div>
        </div>

        {previewAmount !== null && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <ArrowRightLeft className="h-4 w-4" />
            <span>You will receive: {formatNumber(previewAmount)} boostDAI</span>
          </div>
        )}

        <Button 
          className="w-full py-6 text-lg bg-cyan-500 hover:bg-cyan-600 text-black" 
          onClick={onBoost}
        >
          Boost Yield
        </Button>
      </TabsContent>

      <TabsContent value="withdraw" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="withdraw-amount">Amount (boostDAI)</Label>
          <div className="relative">
            <Input
              id="withdraw-amount"
              placeholder="0.00000"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              className="text-lg py-5 bg-black/40 border-cyan-500/20 text-white"
            />
            <Button
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-auto py-1 text-cyan-400 hover:text-cyan-300"
              onClick={() => onAmountChange(boostedAmount?.toString() || "0")}
            >
              max
            </Button>
          </div>
        </div>

        {previewAmount !== null && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <ArrowRightLeft className="h-4 w-4" />
            <span>You will receive: {formatNumber(previewAmount)} 1sDAI</span>
          </div>
        )}

        <Button 
          className="w-full py-6 text-lg bg-black/40 border border-[#7FF4E3]/20 text-[#7FF4E3] hover:bg-[#7FF4E3]/10" 
          variant="outline" 
          onClick={onWithdraw}
        >
          Withdraw
        </Button>
      </TabsContent>
    </Tabs>
  );
}
