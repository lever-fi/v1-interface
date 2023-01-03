import { observer } from "mobx-react-lite";

const colorMappings = {
	FAILED: "error",
	SUCCESS: "success",
	LOADING: "warning",
};

export const ActivityItem = ({
	timestamp,
	state,
	type,
	description,
	reason,
}) => (
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

export const ActivityContainer = observer(({ activity }) => (
	<div className="card card-compact w-full bg-base-200 overflow-y-auto no-scrollbar rounded-xl">
		<div className="card-body">
			<div className="w-full bg-transparent" data-theme="dracula">
				{activity.feed.map((item, index) => (
					<ActivityItem {...item} key={index} />
				))}
			</div>
		</div>
	</div>
));
