import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle } from 'lucide-react';

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
          <div className="mt-8 space-y-4 text-sm text-gray-400">
            <DialogDescription className="mt-4">
              <span className="text-cyan-400">1sDAI</span> is a yield-bearing stablecoin bridged from Sky Protocol (MakerDAO) - <a href="https://docs.spark.fi/user-guides/earning-savings/sdai-overview" target="_blank" rel="noopener noreferrer" className="text-[#7FF4E3] hover:underline">learn more</a>.
            </DialogDescription>
            <DialogDescription>
              <span className="text-[#7FF4E3]">boostDAI</span> is a liquid token you receive when depositing 1sDAI into Yield Boost.
            </DialogDescription>
            <DialogDescription>
              Your boostDAI balance remains constant while its value in 1sDAI grows through yield from Treasury-contributed sources.
            </DialogDescription>
            <DialogDescription>
              Current strategy leverages <a href="https://jup.ag/perps-earn" target="_blank" rel="noopener noreferrer" className="text-[#7FF4E3] hover:underline">JLP</a> liquidity token to earn additional yield, with more strategies in development.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="mt-4">
          <h4 className="text-sm font-medium">Key Benefits:</h4>
          <ul className="mt-1 text-sm text-gray-400">
            <li>Current APY: <span className="text-[#7FF4E3]">{props.currentAPY}%</span></li>
            <li>Instant deposit and withdrawals</li>
            <li>boostDAI remains liquid</li>
          </ul>
        </div>
        <div className="text-xs text-gray-500 mt-4 mb-2">
          *rollout periods and yield amounts may vary, past performance does not guarantee future returns
        </div>
      </DialogContent>
    </Dialog>
  );
}
