import { useState, useEffect } from "react";

import { StatContainer } from "./Stats";
import Socials from "./Socials";

import ActionDepositView from "./views/action/Deposit";
import ActionBorrowView from "./views/action/Borrow";
import ActionRepayView from "./views/action/Repay";
import ActionDetailsView from "./views/action/Inspect";

import { ActivityContainer as InspectActivityView } from "./views/inspect/Activity";
import InspectLoansView from "./views/inspect/Loans";
import InspectBorrowView from "./views/inspect/Borrow";
import InspectContractsView from "./views/inspect/Contracts";

import { Loans, Loan } from "state/Collection/Inspect/Loans";
import { Activity } from "state/Collection/Inspect/Activity";

import OpenSeaIcon from "assets/Socials/OpenSea.svg";
import LooksRareIcon from "assets/Socials/LooksRare.svg";
import TheGraphIcon from "assets/Socials/TheGraph.svg";

const PoolOverview = (
	{
		/* stats0, stats1 */
	}
) => {
	const [loans] = useState(() => new Loans());
	const [loan] = useState(() => new Loan());
	const [activity] = useState(() => new Activity());
	const [actionIndex, setActionIndex] = useState(0);
	const [inspectIndex, setInspectIndex] = useState(0);
	const [stats0, setStats0] = useState([
		{
			title: "Downloads",
			value: "31K",
			desc: "Jan 1st - Feb 1st",
			icon: () => (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					className="inline-block w-8 h-8 stroke-info"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					></path>
				</svg>
			),
		},
		{
			title: "New Users",
			value: "4,200",
			desc: "↗︎ 400 (22%)",
			icon: () => (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					className="inline-block w-8 h-8 stroke-info"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
					></path>
				</svg>
			),
		},
		{
			title: "New Registers",
			value: "1,200",
			desc: "↘︎ 90 (14%)",
			icon: () => (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					className="inline-block w-8 h-8 stroke-info"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
					></path>
				</svg>
			),
		},
	]);
	const [stats1, setStats1] = useState([
		{
			title: "Downloads",
			value: "31K",
			desc: "Jan 1st - Feb 1st",
			icon: () => (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					className="inline-block w-8 h-8 stroke-info"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					></path>
				</svg>
			),
		},
		{
			title: "New Users",
			value: "4,200",
			desc: "↗︎ 400 (22%)",
			icon: () => (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					className="inline-block w-8 h-8 stroke-info"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
					></path>
				</svg>
			),
		},
		{
			title: "New Registers",
			value: "1,200",
			desc: "↘︎ 90 (14%)",
			icon: () => (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					className="inline-block w-8 h-8 stroke-info"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
					></path>
				</svg>
			),
		},
	]);

	const [collection, setCollection] = useState({});

	const actionHeaders = ["Deposit", "Borrow", "Repay", "Inspect"];
	const inspectHeaders = ["Activity", "My Loans", "Borrow", "Contracts"];

	const _setActionIndex = (_actionIndex) => {
		if (_actionIndex != actionIndex) {
			setActionIndex(_actionIndex);
		}
	};

	const contracts = [
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
	];

	const actionViews = [
		(props) => <ActionDepositView {...props} />,
		(props) => <ActionBorrowView {...props} loan={loan} />,
		(props) => <ActionRepayView {...props} loan={loan} />,
		(props) => <ActionDetailsView {...props} loan={loan} />,
	];

	const inspectViews = [
		(props) => (
			<InspectActivityView {...props} loan={loan} activity={activity} />
		),
		(props) => <InspectLoansView {...props} loans={loans} loan={loan} />,
		(props) => <InspectBorrowView {...props} />,
		(props) => <InspectContractsView {...props} contracts={contracts} />,
	];

	useEffect(() => {
		loans.update([
			{
				loan_id: 1,
				token_id: 1029,
				principal: 22.19,
				interest: 0.023,
				interest_rate: 4.5,
				ownership: 0.17,
				next_installment: "6 days",
				schedule: [
					{
						principal: 2.7,
						interest: 0.08,
						due: "01/01/1969",
						state: "PAID",
					},
					{
						principal: 2.7,
						interest: 0.08,
						due: "01/01/1969",
						state: "PAID",
					},
					{
						principal: 2.7,
						interest: 0.08,
						due: "01/01/1969",
						state: "PAID",
					},
					{
						principal: 2.7,
						interest: 0,
						due: "01/01/1969",
						state: "PENDING",
					},
				],
			},
			{
				loan_id: 2,
				token_id: 3920,
				principal: 0.19,
				interest: 0.003,
				interest_rate: 4.5,
				ownership: 0.8,
				next_installment: "6 days",
				schedule: [
					{
						principal: 1.2,
						interest: 0,
						due: "01/01/1969",
						state: "PAID",
					},
					{
						principal: 1.2,
						interest: 0.03,
						due: "01/01/1969",
						state: "PENDING",
					},
					{
						principal: 1.2,
						interest: 0.03,
						due: "01/01/1969",
						state: "PENDING",
					},
					{
						principal: 1.2,
						interest: 0.09,
						due: "01/01/1969",
						state: "PENDING",
					},
				],
			},
			{
				loan_id: 3,
				token_id: 1022,
				principal: 0.19,
				interest: 0.003,
				interest_rate: 4.5,
				ownership: 0.16,
				next_installment: "6 days",
				schedule: [
					{
						principal: 0,
						interest: 0,
						due: "01/01/1969",
						state: "FAIL",
					},
					{
						principal: 0,
						interest: 0,
						due: "01/01/1969",
						state: "FAIL",
					},
					{
						principal: 0,
						interest: 0,
						due: "01/01/1969",
						state: "FAIL",
					},
					{
						principal: 0,
						interest: 0,
						due: "01/01/1969",
						state: "FAIL",
					},
				],
			},
			{
				loan_id: 4,
				token_id: 7367,
				principal: 0.19,
				interest: 0.003,
				interest_rate: 4.5,
				ownership: 0.99,
				next_installment: "6 days",
				schedule: [
					{
						principal: 0,
						interest: 0,
						due: "01/01/1969",
						state: "FAIL",
					},
					{
						principal: 0,
						interest: 0,
						due: "01/01/1969",
						state: "FAIL",
					},
					{
						principal: 0,
						interest: 0,
						due: "01/01/1969",
						state: "FAIL",
					},
					{
						principal: 0,
						interest: 0,
						due: "01/01/1969",
						state: "FAIL",
					},
				],
			},
		]);
	}, []);

	useEffect(() => {
		activity.reset();
		activity.replace([
			{
				timestamp: "10:29:00",
				state: "FAILED",
				type: "ERROR",
				description: "Cannot originate loan on asset.",
				reason: "Loan already exists on asset.",
			},
			{
				timestamp: "10:29:00",
				state: "LOADING",
				type: "PROCESSING",
				description: "Validating loan opportunity.",
			},
			{
				timestamp: "10:29:00",
				state: "SUCCESS",
				type: "PROCESSED",
				description: "Asset info retrieved.",
			},
			{
				timestamp: "10:29:00",
				state: "LOADING",
				type: "PROCESSING",
				description: "Checking asset validity.",
			},
			{
				timestamp: "10:29:00",
				state: "LOADING",
				type: "PROCESSING",
				description: "Grabbing loan data",
			},
			{
				timestamp: "10:29:00",
				state: "FAILED",
				type: "ERROR",
				description: "Cannot originate loan on asset.",
				reason: "Loan already exists on asset.",
			},
			{
				timestamp: "10:29:00",
				state: "LOADING",
				type: "PROCESSING",
				description: "Validating loan opportunity.",
			},
			{
				timestamp: "10:29:00",
				state: "SUCCESS",
				type: "PROCESSED",
				description: "Asset info retrieved.",
			},
			{
				timestamp: "10:29:00",
				state: "LOADING",
				type: "PROCESSING",
				description: "Checking asset validity.",
			},
			{
				timestamp: "10:29:00",
				state: "LOADING",
				type: "PROCESSING",
				description: "Grabbing loan data",
			},
			{
				timestamp: "10:29:00",
				state: "FAILED",
				type: "ERROR",
				description: "Cannot originate loan on asset.",
				reason: "Loan already exists on asset.",
			},
			{
				timestamp: "10:29:00",
				state: "LOADING",
				type: "PROCESSING",
				description: "Validating loan opportunity.",
			},
			{
				timestamp: "10:29:00",
				state: "SUCCESS",
				type: "PROCESSED",
				description: "Asset info retrieved.",
			},
			{
				timestamp: "10:29:00",
				state: "LOADING",
				type: "PROCESSING",
				description: "Checking asset validity.",
			},
			{
				timestamp: "10:29:00",
				state: "LOADING",
				type: "PROCESSING",
				description: "Grabbing loan data",
			},
		]);
	}, []);

	useEffect(() => {
		setCollection({
			name: "Bored Ape Yacht Club",
			symbol: "BAYC",
			address: "0x7f268357a8c2552623316e2562d90e642bb538e5",
		});
	}, []);

	return (
		<div className="w-full">
			<div>
				<div
					className="w-full h-36 overflow-hidden bg-cover bg-center flex items-center justify-center"
					style={{
						backgroundImage: `url(${"https://lh3.googleusercontent.com/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs=h600"})`,
					}}
				>
					<div
						className="w-24 h-24 overflow-hidden bg-cover bg-center"
						style={{
							backgroundImage: `url(${"https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s168"})`,
						}}
					></div>
				</div>
			</div>

			<div className="my-4 flex items-center justify-between">
				<div>
					<div className="flex items-end space-x-2">
						<p className="font-bold text-xl text-white">
							{collection.name}
						</p>
						<p className="font-semibold">{collection.symbol}</p>
					</div>
					<p className="text-xs">{collection.address}</p>
				</div>
				<Socials
					socials={[
						{ name: "OpenSea", href: "", icon: OpenSeaIcon },
						{ name: "LooksRare", href: "", icon: LooksRareIcon },
						{ name: "Etherscan", href: "", icon: TheGraphIcon },
					]}
				/>
			</div>

			<div className="my-6 grid grid-cols-3 grid-flow-col gap-4">
				<div className="col-start-1 col-span-2 flex flex-col space-y-4">
					<div className="card w-full bg-base-300 shadow-xl">
						<div className="card-body">
							<h2 className="card-title">Stats</h2>
							<StatContainer stats={stats0} />
							<StatContainer stats={stats1} />
						</div>
					</div>
					{/* h-full */}
					<div className="w-full flex flex-col">
						<div className="pl-4 tabs z-[2]">
							{inspectHeaders.map((title, index) => (
								<a
									className={`tab tab-lifted ${
										inspectIndex == index
											? "bg-base-300"
											: ""
									}`}
									key={index}
									onClick={() => {
										setInspectIndex(index);
									}}
								>
									{title}
								</a>
							))}
						</div>
						<div className="card w-full h-[22rem] bg-base-300 shadow-xl">
							<div className="card-body w-full h-full overflow-y-auto">
								{/* <h2 className="card-title">
								{inspectHeaders[inspectIndex]}
							</h2> */}
								{inspectViews[inspectIndex]({
									setActionIndex: _setActionIndex,
								})}
							</div>
						</div>
					</div>
				</div>

				<div className="col-start-3 col-span-1">
					<div className="card w-full h-full bg-base-300 shadow-xl">
						<div className="card-body w-full">
							<div className="card-title flex items-center justify-between">
								<h2 className="card-title">
									{actionHeaders[actionIndex]}
								</h2>
								{actionIndex == 0 ? null : (
									<div className="card-actions">
										<button
											className="btn btn-square btn-sm"
											onClick={() => {
												setActionIndex(0);
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
													d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
													clipRule="evenodd"
												/>
											</svg>
										</button>
									</div>
								)}
							</div>
							{actionViews[actionIndex]({})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PoolOverview;
