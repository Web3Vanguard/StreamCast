import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { somniaTestnet } from "./chains";

// Get projectId from environment or use a default
// You can get a free project ID from https://cloud.reown.com
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || "YOUR_PROJECT_ID";

export const metadata = {
  name: "StreamCast Synth",
  description: "PvP Prediction Market dApp",
  url: "https://streamcast-synth.vercel.app",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create Wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  networks: [somniaTestnet],
  projectId,
});

// Create AppKit modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: [somniaTestnet],
  projectId,
  metadata,
  features: {
    analytics: true,
    email: false,
    socials: [],
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "hsl(var(--primary))",
  },
});

// Export the wagmi config for use in WagmiProvider
export const wagmiConfig = wagmiAdapter.wagmiConfig;

