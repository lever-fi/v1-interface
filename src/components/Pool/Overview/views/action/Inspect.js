import { observer } from "mobx-react-lite";

const Ownership = observer(({ loan }) => (
	<div
		class="radial-progress text-primary"
		style={`--value:${loan.ownership * 100};`}
	>
		{loan.ownership * 100}%
	</div>
));

const Inspect = observer(({ loan }) => {
	return (
		<>
			<div className="w-full h-full flex items-center justify-center">
				<div className={`w-full flex flex-col space-y-4`}>
					<p>INSPECTING</p>
					<Ownership loan={loan} />
					{/* <RangeInput
										max={100}
										min={0.05}
										placeholder={0.05}
										disabled={true}
										symbol={"BAYC-LPT"}
									/> */}
				</div>
			</div>
		</>
	);
});

export default Inspect;
