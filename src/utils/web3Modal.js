import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider, // required
		rpc: {
			42: "https://kovan.poa.network",
		},
		network: "kovan",
		options: {
			infuraId: "be138a5fe1e04bc6bf7c8c0eedbf0b71", // required
		},
	},
	coinbasewallet: {
		package: CoinbaseWalletSDK, // Required
		options: {
			appName: "lever-fi", // Required
			infuraId: "be138a5fe1e04bc6bf7c8c0eedbf0b71", // Required
			rpc: "https://kovan.infura.io/v3/be138a5fe1e04bc6bf7c8c0eedbf0b71", // Optional if `infuraId` is provided; otherwise it's required
			chainId: 42, // Optional. It defaults to 1 if not provided
			darkMode: true, // Optional. Use dark theme, defaults to false
		},
	},
};

const web3Modal = new Web3Modal({
	network: 42, // optional
	cacheProvider: true, // optional
	providerOptions, // required
	theme: "dark",
});

export default web3Modal;
