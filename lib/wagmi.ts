import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import {
  injected,
  metaMask,
  coinbaseWallet,
  walletConnect,
} from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base],

  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({
      appName: "ClearLayer",
    }),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
    }),
  ],

  transports: {
    [base.id]: http(),
  },
});
