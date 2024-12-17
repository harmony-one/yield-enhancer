import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pool, UserStats } from "@/types";
import { StatsCard } from "./StatsCard";
import { PoolCard } from "./PoolCard";
import { BarChart, Wallet } from "lucide-react";

const mockPools: Pool[] = [
  {
    id: "1",
    name: "ONE-USDC LP",
    apr: 12.5,
    tvl: 1500000,
    token: "ONE-USDC",
    boostedApr: 18.75,
    userStaked: 1000,
    rewards24h: 1.25
  },
  {
    id: "2",
    name: "ONE-ETH LP",
    apr: 15.8,
    tvl: 2800000,
    token: "ONE-ETH",
    boostedApr: 23.7,
    userStaked: 2500,
    rewards24h: 3.15
  },
  {
    id: "3",
    name: "ONE-BTC LP",
    apr: 18.2,
    tvl: 3500000,
    token: "ONE-BTC",
    boostedApr: 27.3,
    userStaked: 1800,
    rewards24h: 2.75
  }
];

const mockUserStats: UserStats = {
  totalStaked: 5300,
  totalRewards: 7.15,
  boostedPools: 2,
  averageBoost: 1.5
};

export function Dashboard() {
  const [pools] = useState<Pool[]>(mockPools);
  const [userStats] = useState<UserStats>(mockUserStats);

  const handleBoost = (poolId: string) => {
    console.log(`Boosting pool ${poolId}`);
    // Implement boost logic here
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Harmony Yield Booster</h1>
        <Button variant="outline" className="gap-2">
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Value Staked"
          value={userStats.totalStaked}
          prefix="$"
        />
        <StatsCard
          title="24h Rewards"
          value={userStats.totalRewards}
          prefix="$"
        />
        <StatsCard
          title="Boosted Pools"
          value={userStats.boostedPools}
        />
        <StatsCard
          title="Average Boost"
          value={userStats.averageBoost}
          suffix="x"
        />
      </div>

      <Tabs defaultValue="pools" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pools" className="gap-2">
            <BarChart className="h-4 w-4" />
            Yield Pools
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pools">
          <div className="grid gap-4 md:grid-cols-3">
            {pools.map((pool) => (
              <PoolCard
                key={pool.id}
                pool={pool}
                onBoost={handleBoost}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}