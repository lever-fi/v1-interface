import Pool from "./Pool";

const getPools = () => {};

const ThCommon = ({ content }) => {
	return <th className="bg-netural-900 h-full pb-4">{content}</th>;
};

const PoolContainer = () => {
	return (
		<div className="w-screen flex items-center justify-center">
			<div className="w-2/3">
				<p className="w-full text-white text-2xl font-bold">Pools</p>
				<div className="w-full mt-4 h-108 relative">
					<div className="absolute w-full h-full inset-0 bg-gradient-to-br from-primary via-secondary to-secondary-transparent rounded-lg blur opacity-80"></div>
					<div className="relative mt-4 w-full h-full flex items-center justify-center">
						<div className="w-full h-full border-zinc-600 rounded-lg border bg-neutral-900 py-4 pl-8">
							<div className="w-full h-full overflow-y-auto pr-8 no-scrollbar">
								<table class="table-fixed w-full">
									<thead>
										<tr className="sticky top-0 text-left text-sm text-slate-400 border-b border-zinc-600">
											<th className="bg-neutral-900 w-20 h-full pb-4"></th>
											<th className="bg-neutral-900 h-full pb-4">
												Collection
											</th>
											<th className="bg-neutral-900 h-full pb-4">
												Deposited
											</th>
											<th className="bg-neutral-900 h-full pb-4">
												~ APY
											</th>
											<th className="bg-neutral-900 h-full pb-4">
												Threshold
											</th>
											<th className="bg-neutral-900 h-full pb-4">
												Pool Size
											</th>
											<th className="bg-neutral-900 w-60 h-full pb-4"></th>
										</tr>
									</thead>
									<tbody>
										<Pool
											address={0}
											collection={"BAYC"}
											deposits={0}
											apy={1.5}
											threshold={25}
											size={150}
										/>
										<Pool
											address={0}
											collection={"DOODLE"}
											deposits={0}
											apy={1.5}
											threshold={25}
											size={150}
										/>
										<Pool
											address={0}
											collection={"AZUKI"}
											deposits={0}
											apy={1.5}
											threshold={25}
											size={150}
										/>
										<Pool
											address={0}
											collection={"PALS"}
											deposits={0}
											apy={1.5}
											threshold={25}
											size={150}
										/>
										<Pool
											address={0}
											collection={"MOONBIRD"}
											deposits={0}
											apy={1.5}
											threshold={25}
											size={150}
										/>
										<Pool
											address={0}
											collection={"OTHR"}
											deposits={0}
											apy={1.5}
											threshold={25}
											size={150}
										/>
										<Pool
											address={0}
											collection={"PEC"}
											deposits={0}
											apy={1.5}
											threshold={25}
											size={150}
										/>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PoolContainer;
