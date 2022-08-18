import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	Outlet,
} from "react-router-dom";
import { ethers } from "ethers";
import web3Modal from "utils/web3Modal";

import PoolContainer from "components/PoolContainer";
import RootPage from "screens/RootPage";

import LoanerModal from "components/PoolModal/LoanerModal";
import BorrowerModal from "components/PoolModal/BorrowerModal";

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
			<Router>
				<Routes>
					<Route
						path="/"
						exact
						element={
							<RootPage
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
						}
					>
						<Route
							path="/"
							element={
								<PoolContainer
									{...{ instance, provider, signer }}
								/>
							}
						>
							<Route path=":poolAddress/*">
								<Route
									path="overview"
									element={
										<LoanerModal
											title={"Overview"}
											altTitle={"Manage"}
											defaultView={true}
										/>
									}
								/>
								<Route
									path="manage"
									element={
										<LoanerModal
											title={"Overview"}
											altTitle={"Manage"}
											defaultView={false}
										/>
									}
								/>
								<Route
									path="borrow"
									element={
										<BorrowerModal
											title={"Borrow"}
											altTitle={"Activity"}
											defaultView={true}
										/>
									}
								/>
								<Route
									path="activity"
									element={
										<BorrowerModal
											title={"Borrow"}
											altTitle={"Activity"}
											defaultView={false}
										/>
									}
								/>
								<Route path=":loanId" />
								<Route
									path="*"
									element={<Navigate to="overview" replace />}
								/>
							</Route>
						</Route>
					</Route>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
