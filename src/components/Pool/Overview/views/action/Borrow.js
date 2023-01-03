import { RangeInput } from "components/Pool/Overview/Inputs";

const Borrow = ({}) => {
	return (
		<>
			<div className="w-full h-full flex items-center justify-center">
				<div className={`w-full flex flex-col space-y-4`}>
					<RangeInput
						max={100}
						min={0}
						placeholder={20}
						disabled={false}
						symbol={"ETH"}
					/>
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
};

export default Borrow;
