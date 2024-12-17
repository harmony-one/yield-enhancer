import { WagmiProvider, createConfig, http } from "wagmi";
import { harmonyOne } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import {ReactNode} from "react";

export const wagmiConfig = createConfig(
  getDefaultConfig({
    chains: [harmonyOne],
    transports: {
      [harmonyOne.id]: http(),
    },

    walletConnectProjectId: '2c58d7bfbc1b22c38a304d39f6b72781',
    appName: "Yield Enhancer",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

interface Props {
  children?: ReactNode
}

export const Web3Provider = ({ children }: Props) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
