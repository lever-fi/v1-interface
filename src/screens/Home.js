import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers, utils, BigNumber } from "ethers";
import { useQuery } from "urql";

import contractAddresses from "constants/contracts.json";

import { getPools } from "data/pools";

import { Table } from "components/Table";

import round from "utils/round";

const Row = ({
	thumbnail,
	symbol,
	name,
	value,
	apy,
	liquidity,
	href,
	navigate,
}) => {
	return () => (
		<tr>
			<th>
				<div
					className="ml-4 overflow-hidden bg-cover bg-center rounded-full h-10 w-10 border border-white"
					style={{
						backgroundImage: `url(${"https://ipfs.io/ipfs/QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi"})`,
					}}
				></div>
			</th>
			<td>
				<div>
					<div class="font-bold">{symbol}</div>
					<div class="text-sm opacity-50">{name}</div>
				</div>
			</td>
			<td>{value} ETH</td>
			<td>{apy}%</td>
			<td>{liquidity} ETH</td>
			<td>
				<button
					class="w-12 btn text-white font-semibold py-2 px-4 bg-gradient-to-r from-primary to-secondary"
					onClick={() => {
						navigate(href);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-6 h-6"
					>
						<path
							fillRule="evenodd"
							d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</td>
		</tr>
	);
};

const Home = ({ instance, provider, signer }) => {
	const navigate = useNavigate();
	const [pools, setPools] = useState([]);
	const [popularPoolQueryResult, reexecutePopularPoolQueryResult] = useQuery(
		getPools(null, 10, "asc", "created_at")
	);

	useEffect(() => {
		setPools(popularPoolQueryResult?.data?.poolEntities || []);
	}, [popularPoolQueryResult]);

	// const pools = [
	// 	{
	// 		thumbnail: "",
	// 		symbol: "LSBAYC",
	// 		name: "Bored Ape Yacht Club",
	// 		value: 100.0,
	// 		apy: 5.29,
	// 		liquidity: 29.12,
	// 		href: "./address/overview",
	// 		navigate,
	// 	},
	// ];
	return (
		<div className="mx-36 h-[28rem] relative">
			<div className="absolute w-full h-full inset-0 bg-gradient-to-br from-primary via-secondary to-secondary-transparent rounded-lg blur opacity-80"></div>
			<div className="relative w-full h-full flex items-center justify-center">
				<div className="w-full h-full border-zinc-600 rounded-lg border bg-[#171717]">
					<div className="w-full h-full overflow-y-auto no-scrollbar">
						<Table
							headers={[
								null,
								"Symbol",
								"Value",
								"~ APY",
								"Liquidity",
								null,
							]}
							rows={pools.map((pool, index) =>
								Row({
									...{
										symbol: pool.original_collection.symbol,
										name: pool.original_collection.name,
										value: 100,
										apy: 5.29,
										liquidity: 10,
										href: `./${pool.address}/overview`,
										key: index,
										navigate,
									},
								})
							)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
