import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as UrqlProvider } from "urql";
import { ToastContainer } from "react-toastify";
import "@rainbow-me/rainbowkit/styles.css";
import {
	getDefaultWallets,
	RainbowKitProvider,
	darkTheme,
	midnightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import "./daisy.css";
import App from "./App";
import UrqlClient from "utils/UrqlClient";

const { chains, provider } = configureChains(
	[chain.goerli],
	[
		alchemyProvider({ apiKey: "t4SN4ecGQDM3aNl_aXEjE9LqSOjTZkr-" }),
		publicProvider(),
	]
);

const { connectors } = getDefaultWallets({
	appName: "Lever Finance",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				chains={chains}
				initialChain={chain.goerli}
				theme={darkTheme()}
			>
				<UrqlProvider value={UrqlClient}>
					<App />
					<ToastContainer />
				</UrqlProvider>
			</RainbowKitProvider>
		</WagmiConfig>
	</React.StrictMode>
);
