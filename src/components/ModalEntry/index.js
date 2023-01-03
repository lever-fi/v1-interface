const Tooltip = ({ tip }) => {
	return <div></div>;
};

const Change = ({ change }) => {
	return (
		<div className="-t-2">
			<p
				className={`text-xs md:text-sm font-semibold ${
					change >= 0 ? "text-emerald-400" : "text-rose-600"
				}`}
			>
				{change}%
			</p>
		</div>
	);
};

const ModalEntry = ({ title, value, symbol, change, right, tip }) => {
	return (
		<div className="w-full space-y-1">
			{title ? (
				<div
					className={`flex ${
						right === true ? "flex-row-reverse" : ""
					} items-center justify-between`}
				>
					<div
						className={`flex whitespace-normal lg:whitespace-nowrap ${
							right === true ? "flex-row-reverse" : ""
						} items-start`}
					>
						<p
							className={`font-bold sm:text-sm md:text-lg text-electric-blue ${
								right === true ? "ml-2" : "mr-2"
							}`}
						>
							{title}
						</p>
						{change ? <Change change={change} /> : null}
					</div>
					{tip ? <Tooltip tip={tip} /> : null}
				</div>
			) : null}
			<div
				className={`h-12 rounded-md bg-neutral-700 p-4 flex ${
					right === true ? "flex-row-reverse" : ""
				} justify-between items-center`}
			>
				<p className="text-white sm:text-sm md:text-lg font-semibold">
					{value}
				</p>
				<p className="text-neutral-400 font-semibold text-xs">
					{symbol}
				</p>
			</div>
		</div>
	);
};

const Contract = ({ title, address }) => {
	return (
		<div className="text-left">
			<p className="text-sm font-semibold text-neutral-400">{title}</p>
			<div className="-mt-1 flex items-end">
				<p className="font-semibold text-white">{address}</p>
			</div>
		</div>
	);
};

const ContractWrapper = ({ contracts, tip }) => {
	return (
		<div className="w-full space-y-1">
			<div className={`flex items-center justify-between`}>
				<div
					className={`whitespace-normal lg:whitespace-nowrap items-start`}
				>
					<p
						className={`font-bold sm:text-sm md:text-lg text-electric-blue`}
					>
						Contracts
					</p>
				</div>
				{tip ? <Tooltip tip={tip} /> : null}
			</div>
			<div
				className={`max-h-56 rounded-md bg-neutral-700 p-4 overflow-auto space-y-1`}
			>
				{contracts.map((contract, idx) => {
					return <Contract {...contract} key={idx} />;
				})}
			</div>
		</div>
	);
};

export { ContractWrapper, ModalEntry };
