import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import PoolOverview from "components/Pool/Overview";

const Workshop = () => {
	const navigate = useNavigate();
	const stats = {
		banner: "",
		logo: "",
		name: "",
		symbol: "",
		address: "",
		active_loans: "",
		value: "",
		liquidity: "",
		apy: "",
		interest_rate: "",
		loan_term: "",
		collection_volume: "",
		pool_volume: "",
		contracts: [
			{
				name: "pool",
				address: "",
			},
			{
				name: "token",
				address: "",
			},
			{
				name: "token0",
				address: "",
			},
			{
				name: "token1",
				address: "",
			},
		],
	};

	return (
		<div className="mx-16">
			<div className="w-full overflow-y-auto no-scrollbar">
				<PoolOverview stats={stats} />
			</div>
		</div>
	);
};

export default Workshop;
