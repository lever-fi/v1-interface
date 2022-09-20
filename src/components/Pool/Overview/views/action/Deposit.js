import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Calculator } from "state/Deposit/Conversions";

import { Stat } from "components/Pool/Overview/Stats";
import { RangeInput } from "components/Pool/Overview/Inputs";

import { ReactComponent as SwapOutlined } from "assets/SwapOutlined.svg";

const EthAmount = observer(({ calculator }) => <span>{calculator.eth}</span>);
const TokenAmount = observer(({ calculator }) => (
	<span>{calculator.token}</span>
));

const Deposit = ({}) => {
	const [calculator] = useState(() => new Calculator());
	const [isContribute, setIsContribute] = useState(true);
	return (
		<>
			<div className="w-full">
				<div className="w-full space-y-2">
					<div className="stats rounded-xl shadow w-full">
						<Stat
							{...{
								title: "Current Balance",
								value: "10.29M",
								desc: "BAYC-LPT",
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
							}}
						/>
					</div>
					<div className="stats rounded-xl shadow w-full">
						<Stat
							{...{
								title: "Pool Share",
								value: "0.01%",
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
							}}
						/>
					</div>
				</div>
			</div>
			<div className="w-full mt-4">
				<div className="card card-compact w-full bg-base-200 shadow-xl rounded-xl">
					<div className={`card-body flex items-center flex-col`}>
						{/* <h2 className="card-title">Stats</h2> */}
						<div
							className={`stats rounded-lg shadow-md w-full my-2`}
							style={{
								order: isContribute ? 0 : 2,
							}}
						>
							<div className="stat bg-base-200">
								{/* <div className="stat-figure">{"ETH"}</div> */}
								<div className="stat-title">
									{isContribute ? "Contribute" : ""}
								</div>
								<div className="flex items-end justify-between">
									<div className="stat-value">
										<EthAmount calculator={calculator} />
									</div>
									<div className="stat-figure">{"ETH"}</div>
								</div>
								{isContribute ? (
									<div className="stat-desc mt-2">
										<RangeInput
											max={100}
											min={0}
											placeholder={20}
											disabled={false}
											symbol={"ETH"}
											onChange={(e) => {
												if (isContribute) {
													calculator.updateConversion(
														{
															eth: e.target.value,
														}
													);
												}
											}}
										/>
									</div>
								) : null}
							</div>
						</div>

						<div
							className={`w-10 h-10 p-2 rounded-full bg-neutral-700 cursor-pointer shadow-md`}
							style={{
								order: 1,
							}}
							onClick={() => {
								setIsContribute(!isContribute);
								calculator.reset({
									eth: 0,
									token: 0,
								});
							}}
						>
							<SwapOutlined className="fill-electric-blue w-full h-full" />
						</div>

						<div
							className={`stats rounded-lg shadow-md w-full my-2`}
							style={{
								order: !isContribute ? 0 : 2,
							}}
						>
							<div className="stat bg-base-200">
								{/* <div className="stat-figure">{"ETH"}</div> */}
								<div className="stat-title">
									{!isContribute ? "Collect" : ""}
								</div>
								<div className="flex items-end justify-between">
									<div className="stat-value">
										<TokenAmount calculator={calculator} />
									</div>
									<div className="stat-figure">
										{"BAYC-LPT"}
									</div>
								</div>
								{!isContribute ? (
									<div className="stat-desc mt-2">
										<RangeInput
											max={100}
											min={0}
											placeholder={20}
											disabled={false}
											symbol={"ETH"}
											onChange={(e) => {
												if (!isContribute) {
													calculator.updateConversion(
														{
															token:
																e.target.value,
														}
													);
												}
											}}
										/>
									</div>
								) : null}
							</div>
						</div>
						{/* <p>{isContribute ? "Contribute" : "Collect"}</p>
						<div
							className={`w-full flex flex-col space-y-4 ${
								isContribute ? "" : "flex-reverse"
							}`}
						></div> */}
						<div
							className="card-actions"
							style={{
								order: 3,
							}}
						>
							<button className="btn btn-wide text-white bg-gradient-to-r from-primary to-secondary font-semibold bg-base-100 shadow-md">
								Confirm
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Deposit;
