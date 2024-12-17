import { Pool } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface PoolCardProps {
  pool: Pool;
  onBoost: (poolId: string) => void;
}

export function PoolCard({ pool, onBoost }: PoolCardProps) {
  const boostMultiplier = (pool.boostedApr / pool.apr).toFixed(2);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{pool.name}</span>
          <span className="text-sm font-normal text-muted-foreground">{pool.token}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Base APR</p>
            <p className="text-2xl font-bold">{formatNumber(pool.apr)}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Boosted APR</p>
            <p className="text-2xl font-bold text-green-600">{formatNumber(pool.boostedApr)}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">TVL</p>
            <p className="text-lg font-semibold">${formatNumber(pool.tvl)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Your Stake</p>
            <p className="text-lg font-semibold">${formatNumber(pool.userStaked)}</p>
          </div>
        </div>
        <Button 
          className="w-full"
          onClick={() => onBoost(pool.id)}
          variant="default"
        >
          Boost Yield ({boostMultiplier}x) <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}