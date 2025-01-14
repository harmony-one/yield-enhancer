import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle } from 'lucide-react';
import {INITIAL_EXCHANGE_RATE} from "@/lib/constants";

export function HowItWorksDialog(props: {
  currentAPY: string;
  exchangeRate: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300 bg-white/5 hover:bg-white/10 backdrop-blur-sm">
          <HelpCircle className="h-4 w-4 mr-2" />
          How it works
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1A1A1A] text-white border-cyan-500/20">
        <DialogHeader>
          <DialogTitle>How Yield Boost Works</DialogTitle>
          <div className="space-y-4 text-sm text-gray-400">
            <DialogDescription>
              1sDAI is a yield-bearing stablecoin bridged from Sky Protocol (MakerDAO) - <a href="https://docs.spark.fi/user-guides/earning-savings/sdai-overview" target="_blank" rel="noopener noreferrer" className="text-[#7FF4E3] hover:underline">learn more</a>. When you deposit 1sDAI, you receive boostDAI at the current exchange rate: 1 boostDAI = {props.exchangeRate} 1sDAI.
            </DialogDescription>
            <DialogDescription>
              Initially, 1 boostDAI = {INITIAL_EXCHANGE_RATE} 1sDAI. This ratio gradually increases over time, which is how yield is generated. Your boostDAI balance remains constant, but its value in 1sDAI grows.
            </DialogDescription>
            <DialogDescription>
              The yield comes from various sources outside of Harmony, contributed by the Treasury. This extra yield is pooled back to Yield Boost users on a 14-day rollout period, with varying yields each period.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="py-4">
          <h4 className="text-sm font-medium mb-2">Key Benefits:</h4>
          <ul className="list-disc list-inside text-sm space-y-1 text-gray-400">
            <li>Current APY: {props.currentAPY}%</li>
            <li>Yield earned through increasing exchange rate</li>
            <li>Instant deposits and withdrawals</li>
            <li>No minimum deposit required</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
