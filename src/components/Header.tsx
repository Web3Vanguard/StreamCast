import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { SidebarTrigger } from "./ui/sidebar";
import { Wallet, Bell } from "lucide-react";
import { useAccount, useDisconnect } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { formatAddress } from "@/lib/utils";

export const Header = () => {
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-6 gap-4 sticky top-0 z-10">
      <SidebarTrigger className="lg:hidden" />
      
      <div className="flex-1 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
          <span className="text-xs text-muted-foreground">Stream Connected</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-primary/30 text-primary">
          Somnia Testnet
        </Badge>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </Button>
        
        {isConnected && address ? (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              {formatAddress(address)}
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => disconnect()}
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan"
            onClick={() => open()}
          >
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
};
