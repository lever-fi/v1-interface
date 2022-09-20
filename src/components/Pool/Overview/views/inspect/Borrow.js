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
				<div className="w-full">
					<NumberInput
						min={0}
						max={10000}
						placeholder={325}
						disabled={false}
					/>
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
