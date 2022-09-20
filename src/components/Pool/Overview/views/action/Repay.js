import { useState } from "react";
import { observer } from "mobx-react-lite";

import { Calculator } from "state/Deposit/Conversions";

import { RangeInput } from "components/Pool/Overview/Inputs";
import Schedule from "components/Pool/Overview/Schedule";

const EthAmount = observer(({ calculator }) => <span>{calculator.eth}</span>);

const Ownership = observer(({ loan }) => (
	<div
		data-theme="dark"
		className="m-auto radial-progress bg-base-100 text-success font-semibold text-xl border-4 border-base-100"
		style={{
			"--value": loan.ownership * 100,
			"--size": "10rem",
			"--thickness": "0.75rem",
		}}
	>
		{loan.ownership * 100}%
	</div>
));

const Repay = ({ loan }) => {
	const [calculator] = useState(() => new Calculator());

	return (
		<>
			<div className="w-full">
				<div className="card rounded-xl w-full bg-base-200 shadow-xl">
					<div className={`card-body flex items-center flex-col`}>
						<h2 className="card-title">Ownership</h2>
						<Ownership loan={loan} />
					</div>
				</div>
			</div>

			{/* <label className="swap swap-flip w-full">
				<input type="checkbox" />

				<div className="swap-off w-full"> */}
			<div className="w-full mt-4">
				<div className="card rounded-xl card-compact w-full bg-base-200 shadow-xl">
					<div className={`card-body flex items-center flex-col`}>
						<div className="w-full pl-4">
							<Schedule loan={loan} />
						</div>
						<div className={`stats rounded-lg shadow w-full my-2`}>
							<div className="stat bg-base-200">
								<div className="stat-title">{"Repay"}</div>
								<div className="flex items-end justify-between">
									<div className="stat-value">
										<EthAmount calculator={calculator} />
									</div>
									<div className="stat-figure">{"ETH"}</div>
								</div>
								<div className="stat-desc mt-2">
									<RangeInput
										max={100}
										min={0}
										placeholder={20}
										disabled={false}
										symbol={"ETH"}
										onChange={(e) => {
											calculator.updateConversion({
												eth: e.target.value,
											});
										}}
									/>
								</div>
							</div>
						</div>

						<div className="card-actions">
							<button className="btn btn-wide text-white bg-gradient-to-r from-primary to-secondary font-semibold bg-base-100">
								Confirm
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* </div> */}

			{/* <div className="swap-on w-full"> */}
			<div className="w-full mt-4">
				<div className="card rounded-xl card-compact w-full bg-base-200 shadow-xl">
					<div className={`card-body flex items-center flex-col`}>
						<div className={`stats rounded-lg shadow w-full my-2`}>
							<div className="stat bg-base-200">
								<div className="stat-title">{"Pre-load"}</div>
								<div className="flex items-end justify-between">
									<div className="stat-value">
										<EthAmount calculator={calculator} />
									</div>
									<div className="stat-figure">{"ETH"}</div>
								</div>
								<div className="stat-desc mt-2">
									<RangeInput
										max={100}
										min={0}
										placeholder={20}
										disabled={false}
										symbol={"ETH"}
										onChange={(e) => {
											calculator.updateConversion({
												eth: e.target.value,
											});
										}}
									/>
								</div>
							</div>
						</div>

						<div className="card-actions">
							<button className="btn btn-wide text-white bg-gradient-to-r from-primary to-secondary font-semibold bg-base-100">
								Confirm
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* </div>
			</label> */}
		</>
	);
};

export default Repay;

/* 
Flip ownership to show nft image n attributes
*/
