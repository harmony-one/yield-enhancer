export interface Pool {
  id: string;
  name: string;
  apr: number;
  tvl: number;
  token: string;
  boostedApr: number;
  userStaked: number;
  rewards24h: number;
}

export interface UserStats {
  totalStaked: number;
  totalRewards: number;
  boostedPools: number;
  averageBoost: number;
}