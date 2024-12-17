import { useState, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const connect = useCallback(async () => {
    setIsConnected(true);
    setAddress("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
    toast({
      title: "Wallet Connected",
      description: "Mock wallet connected successfully for testing.",
    });
  }, [toast]);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setAddress(null);
    toast({
      title: "Wallet Disconnected",
      description: "Wallet has been disconnected.",
    });
  }, [toast]);

  return {
    isConnected,
    address,
    connect,
    disconnect
  };
}