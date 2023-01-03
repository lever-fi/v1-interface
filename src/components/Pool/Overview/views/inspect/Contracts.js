const Contract = ({ title, address }) => (
	<div>
		<p className="text-sm">{title}</p>
		<p className="font-semibold text-lg text-white">{address}</p>
	</div>
);

const Contracts = ({ contracts }) => (
	<div className="card w-full bg-base-200 overflow-y-auto overflow-x-auto no-scrollbar rounded-xl space-y-2">
		<div className="card-body">
			{contracts.map((contract, index) => (
				<Contract {...contract} key={index} />
			))}
		</div>
	</div>
);

export default Contracts;
