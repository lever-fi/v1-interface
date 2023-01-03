import { Stat } from "components/Pool/Overview/Stats";
import { RangeInput } from "components/Pool/Overview/Inputs";

const DepositView = () => {
	return (
		<>
			<div className="w-full">
				<div className="stats shadow w-full">
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

export default DepositView;
