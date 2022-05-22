import { useState, useEffect } from "react";
import { ethers } from "ethers";
import web3Modal from "utils/web3Modal";

import Topbar from "components/Topbar";
import PoolContainer from "components/PoolContainer";
import Footer from "components/Footer";

const App = () => {
	const [connected, setConnected] = useState(false);
	const [address, setAddress] = useState(null);
	const [instance, setInstance] = useState(null);
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);

	const checkChain = () => {};

	useEffect(() => {
		const main = async () => {
			const isWalletConnected = localStorage.getItem("isWalletConnected");

			if (isWalletConnected === "true") {
				const _instance = await web3Modal.connect();
				const _provider = new ethers.providers.Web3Provider(_instance);
				const _signer = _provider.getSigner();

				setInstance(_instance);
				setProvider(_provider);
				setSigner(_signer);

				setAddress(await _signer.getAddress());
				setConnected(true);
			}
		};

		main();
	}, []);

	useEffect(() => {
		if (provider) {
			provider.on("accountsChanged", (accounts) => {
				setAddress(accounts[0]);
				setSigner(provider.getSigner());
			});

			// Subscribe to chainId change
			provider.on("chainChanged", (chainId) => {
				console.log(chainId);
				// check chain
			});

			// Subscribe to provider connection
			provider.on("connect", (info /* : { chainId: number } */) => {
				console.log(info);
				// check chain
			});

			// Subscribe to provider disconnection
			provider.on("disconnect", (
				error /* : { code: number, message: string } */
			) => {
				console.log(error);
			});
		}
	}, [provider]);

	return (
		<div className="">
			<Topbar
				{...{
					setConnected,
					address,
					setAddress,
					instance,
					setInstance,
					provider,
					setProvider,
					signer,
					setSigner,
				}}
			/>
			<div className="h-28"></div>
			<PoolContainer {...{ instance, provider, signer }} />
			<Footer />
		</div>
	);
};

export default App;
