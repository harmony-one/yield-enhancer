import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { formatAddress } from "@/lib/format";
import { Wallet } from "lucide-react";

export function WalletButton() {
  const { isConnected, address, connect, disconnect } = useWallet();

  return (
    <Button
      variant={isConnected ? "outline" : "default"}
      onClick={() => isConnected ? disconnect() : connect()}
      className="flex gap-2 bg-cyan-500 hover:bg-cyan-600 text-black border-0"
    >
      <Wallet className="h-4 w-4" />
      {isConnected ? formatAddress(address!) : "Connect"}
    </Button>
  );
}