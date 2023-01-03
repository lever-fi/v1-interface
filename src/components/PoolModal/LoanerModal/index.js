import { useState, useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useQuery } from "urql";
import web3Modal from "utils/web3Modal";
import { ethers } from "ethers";

import liquidityTokenAbi from "abis/IERC20Minimal.json";
import collectionAbi from "abis/IERC721Minimal.json";
import leverV1PoolAbi from "abis/LeverV1Pool.json";

import generateContractInstance from "utils/generateContractInstance";
import { getPoolByAddress } from "data/pools";

import Modal from "components/Modal";
import Banner from "components/PoolModal/Banner";
import PoolLink from "components/PoolModal/PoolLink";
import Overview from "./Overview";
import Manage from "./Manage";

const defaultCollection = {
	symbol: "BAYC",
	name: "Bored Ape Yacht Club",
	icon: "",
	banner: "",
	address: "",
	links: [
		{
			name: "OpenSea",
			href: "opensea.io/collection/{{SLUG}}",
			icon:
				"https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png",
		},
		{
			name: "LooksRare",
			href: "looksrare.org/collection/{{ADDRESS}}",
			icon:
				"https://publish.one37pm.net/wp-content/uploads/2022/01/MOBILE-65.jpg",
		},
		{
			name: "Etherscan",
			href: "etherscan.io/address/{{ADDRESS}}",
			icon:
				"https://etherscan.io/images/brandassets/etherscan-logo-circle.png",
		},
	],
	stats: {
		Liquidity: {
			value: 1920.2,
			change: 12.9,
		},
		"Avg. Interest Rate": {
			value: 0.05,
		},
		"Collection Vol. (24h)": {
			value: 19203.04,
			change: 12.9,
		},
		"Avg. Daily % Rate": {
			value: 4.19,
		},
		"Loan Term": {
			value: 2,
		},
		"Pool Vol. (24h)": {
			value: 201.01,
			change: -12.9,
		},
	},
	contracts: [
		{
			title: "BAYC-LFI-LPP (Pool)",
			address: "0x7f268357a8c2552623316e2562d90e642bb538e5",
		},
		{
			title: "BAYC-LFI-LPT (Liquidity Token)",
			address: "0x7f268357a8c2552623316e2562d90e642bb538e5",
		},
		{
			title: "BAYC-LFI-LPW (Wrapped Collection)",
			address: "0x7f268357a8c2552623316e2562d90e642bb538e5",
		},
		{
			title: "BAYC-LFI-LPV (Vault)",
			address: "0x7f268357a8c2552623316e2562d90e642bb538e5",
		},
	],
};

const LoanerModal = ({ title, altTitle, defaultView }) => {
	let navigate = useNavigate();
	const { poolAddress } = useParams();

	const [active, setActive] = useState(true);
	const [collection, setCollection] = useState({});
	const [pool, setPool] = useState({});
	const [isView, setIsView] = useState(defaultView);
	const [poolQueryResult, reexecutePoolQueryResult] = useQuery(
		getPoolByAddress(poolAddress)
	);

	useEffect(() => {
		const main = async () => {
			const isWalletConnected = localStorage.getItem("isWalletConnected");
			const queryData = poolQueryResult?.data?.poolEntities[0];

			if (!queryData) {
				return;
			}

			let _collection = {};
			let _pool = {};

			_collection.original = queryData.original_collection;
			_collection.synthetic = queryData.synthetic_collection;
			_collection.token = queryData.token;

			_pool.address = queryData.address;
			_pool.collateralCoverageRatio = queryData.collateral_coverage_ratio;
			_pool.interestRate = queryData.interest_rate;
			_pool.chargeInterval = queryData.charge_interval;
			_pool.burnRate = queryData.burn_rate;
			_pool.loanTerm = queryData.loan_term;
			_pool.minLiquidity = queryData.min_liquidity;
			_pool.minDeposit = queryData.min_deposit;
			_pool.paymentFrequency = queryData.payment_frequency;
			/* icon, banner, slug (opensea) */
			_pool.links = [
				{
					name: "OpenSea",
					href: "opensea.io/collection/{{SLUG}}",
					icon:
						"https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png",
				},
				{
					name: "LooksRare",
					href: `looksrare.org/collection/${_pool.address}`,
					icon:
						"https://publish.one37pm.net/wp-content/uploads/2022/01/MOBILE-65.jpg",
				},
				{
					name: "Etherscan",
					href: `etherscan.io/address/${_pool.address}`,
					icon:
						"https://etherscan.io/images/brandassets/etherscan-logo-circle.png",
				},
			];
			_pool.stats = {};
			_pool.contracts = [
				{
					title: `${_collection.original.symbol}-LFI-LPP (Pool)`,
					address: poolAddress,
				},
				{
					title: `${
						_collection.token.symbol /* -LFI-LPT */
					} (Liquidity Token)`,
					address: _collection.token.address,
				},
				{
					title: `${
						_collection.synthetic.symbol /* -LFI-LPW */
					} (Synthetic Collection)`,
					address: _collection.synthetic.address,
				},
				{
					title: `${_collection.original.symbol}-LFI-LPV (Vault)`,
					address: "0x",
				},
			];

			if (isWalletConnected === "true") {
				const _instance = await web3Modal.connect();
				const _provider = new ethers.providers.Web3Provider(_instance);
				const _signer = _provider.getSigner();

				_pool._instance = _instance;
				_pool._provider = _provider;
				_pool._signer = _signer;
				_pool.balance = await _provider.getBalance(poolAddress);

				_pool.instance = generateContractInstance(
					_pool.address,
					leverV1PoolAbi.abi,
					_signer
				);
				_pool.liquidityTokenInstance = generateContractInstance(
					queryData.token.address,
					liquidityTokenAbi.abi,
					_signer
				);
				_pool.originalCollectionInstance = generateContractInstance(
					queryData.original_collection.address,
					collectionAbi.abi,
					_signer
				);
				_pool.syntheticCollectionInstance = generateContractInstance(
					queryData.synthetic_collection.address,
					collectionAbi.abi,
					_signer
				);
			}

			setCollection(_collection);
			setPool(_pool);
		};

		main();
	}, [poolQueryResult]);

	useEffect(() => {
		reexecutePoolQueryResult();
	}, [poolAddress]);

	const toggleView = () => {
		setIsView(!isView);
	};

	useEffect(() => {
		if (active === false) {
			navigate("../../");
		}
	}, [active]);

	return (
		<Modal
			symbol={collection?.original?.symbol || ""}
			setActive={setActive}
		>
			<div className="relative mx-8">
				<div className="absolute w-full h-full inset-0 bg-gradient-to-br from-primary via-secondary to-secondary-transparent rounded-lg blur opacity-80"></div>
				<div className="relative bg-neutral-1000 border-zinc-600 rounded-lg border bg-neutral-900 overflow-x-hidden overflow-y-auto no-scrollbar shadow-xl transform transition-all py-6 w-[80vw] md:w-[60vw] lg:w-[40vw] 2xl:w-[30vw] max-h-[80vh]">
					<div className="relative w-full">
						<div>
							<div className="flex items-start justify-between px-4">
								<h3 className="text-2xl font-bold text-white">
									{isView ? title : altTitle}
								</h3>
								<div className="w-24 h-8 rounded-md bg-white text-center flex items-center justify-center text-center cursor-pointer shadow-inner">
									<p
										className="font-semibold"
										onClick={() => {
											navigate(
												isView
													? "../manage"
													: "../overview"
											);
											toggleView();
										}}
									>
										{isView ? altTitle : title}
									</p>
								</div>
							</div>

							<Banner
								bg={
									"https://lh3.googleusercontent.com/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs=h600"
								}
								logo={
									"https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s168"
								}
							/>

							<div className="flex justify-between items-center px-2 md:px-4">
								<p className="text-xl font-bold text-white text-left">
									{collection?.original?.name || "Loading..."}
								</p>
								<div className="flex items-center space-x-2">
									{pool?.links && pool.links.length > 0
										? pool.links.map((props, idx) => {
												return (
													<PoolLink
														key={idx}
														{...props}
													/>
												);
										  })
										: null}
								</div>
							</div>
						</div>

						{isView ? (
							<Overview {...{ pool, collection }} />
						) : (
							<Manage {...{ pool, collection }} />
						)}
					</div>
				</div>
				<div className="absolute right-3 -bottom-6">
					<p className="italic text-sm font-light text-neutral-300">
						vBETA
					</p>
				</div>
			</div>
		</Modal>
	);
};

export default LoanerModal;
