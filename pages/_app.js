import "../styles/globals.css";

import merge from "lodash.merge";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  midnightTheme,
} from "@rainbow-me/rainbowkit";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
// import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const xdcApothem = {
  id: 51,
  name: "Apothem-Network (TestNet)",
  network: "XDC Apothem Network (TestNet)",
  nativeCurrency: {
    decimals: 18,
    name: "XDC-Network",
    symbol: "XDC",
  },
  rpcUrls: {
    default: {
      http: ["https://erpc.apothem.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "Apothem Explorer",
      url: "https://explorer.apothem.network/",
    },
  },
  testnet: true,
};

const { provider, chains } = configureChains(
  [xdcApothem],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "XDCPay",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const myTheme = merge(midnightTheme(), {
  colors: {
    accentColor: "#18181b",
    accentColorForeground: "#fff",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={myTheme}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
