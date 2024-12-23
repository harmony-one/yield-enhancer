import axios from 'axios'
import {appConfig} from "@/config.ts";

const apiClient = axios.create({
  baseURL: appConfig.apiUrl
})

export interface VaultReward {
  blockNumber: number
  timestamp: number
  transactionHash: string
  amount: string
}

export interface VaultRewardsInfo {
  sync: {
    latestBlock: number
    latestTimestamp: number
    epochDuration: string
    lastEpochStart: string
    rewardsPerEpoch: string
  }
}

export const getRewardsInfo = async () => {
  const { data } = await apiClient.get<VaultRewardsInfo>('/rewards/info')
  return data
}

export const getRewards = async () => {
  const { data } = await apiClient.get<VaultReward[]>('/rewards/list')
  return data
}
