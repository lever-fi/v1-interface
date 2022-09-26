import { observer } from "mobx-react-lite";

import { NumberInput } from "components/Pool/Overview/Inputs";

const colorMappings = {
	FAILED: "error",
	SUCCESS: "success",
	LOADING: "warning",
};

const ActionItem = ({ timestamp, state, type, description, reason }) => (
	<div>
		<p>
			<span
				className={`text-${colorMappings[state]} font-semibold text-xs`}
			>
				{type}
			</span>
			<span className="text-xs text-[#A6ADBA] font-light mx-1">
				[{timestamp}]
			</span>
			<span className="font-medium">{description}</span>
		</p>
		{reason ? (
			<p
				className={`ml-4 text-xs font-medium text-${colorMappings[state]}`}
			>
				{reason}
			</p>
		) : null}
	</div>
);

const actions = [
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
];

const Borrow = ({}) => (
	<div className="card w-full h-full bg-base-200 overflow-y-auto overflow-x-auto no-scrollbar rounded-xl">
		<div className="card-body flex flex-row items-center justify-between space-x-4">
			<div className="w-40 space-y-4">
				<div className="w-full relative">
					<NumberInput
						min={0}
						max={10000}
						placeholder={325}
						disabled={false}
						className="pr-[3.5rem]"
					/>
					<div className="h-8 w-8 bg-accent rounded-md absolute right-2 top-2 flex items-center justify-center cursor-pointer">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="white"
								className="w-5 h-5"
							>
								<path
									fillRule="evenodd"
									d="M4.606 12.97a.75.75 0 01-.134 1.051 2.494 2.494 0 00-.93 2.437 2.494 2.494 0 002.437-.93.75.75 0 111.186.918 3.995 3.995 0 01-4.482 1.332.75.75 0 01-.461-.461 3.994 3.994 0 011.332-4.482.75.75 0 011.052.134z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M5.752 12A13.07 13.07 0 008 14.248v4.002c0 .414.336.75.75.75a5 5 0 004.797-6.414 12.984 12.984 0 005.45-10.848.75.75 0 00-.735-.735 12.984 12.984 0 00-10.849 5.45A5 5 0 001 11.25c.001.414.337.75.751.75h4.002zM13 9a2 2 0 100-4 2 2 0 000 4z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</div>
				</div>
				<div className="w-full h-40 bg-base-100 rounded-md"></div>
			</div>

			<div className="card card-compact flex-1 max-h-56 bg-base-300 rounded-md overflow-y-auto">
				<div className="card-body">
					<div className="w-full bg-transparent" data-theme="dracula">
						{actions.map((action, index) => (
							<ActionItem {...action} key={index} />
						))}
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Borrow;

/* 
+/- installments
select initial contribution
interest rate
auto-generated terms and conditions for loan agreement - upload to ipfs?
*/
