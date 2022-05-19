const TdCommon = ({ content }) => {
	return <td className="py-6">{content}</td>;
};

const ActionButton = ({ bg, content, onClick }) => {
	return (
		<div
			className={`py-1 px-3 w-1/2 pointer ${bg} text-white font-bold text-center rounded-lg`}
			onClick={onClick}
		>
			<p>{content}</p>
		</div>
	);
};

const Pool = ({
	address = "0x00000000000000000000",
	collection = "BAYC",
	deposits = 0,
	apy = 1.5,
	threshold = 25,
	size = 150,
}) => {
	return (
		<tr className="text-white font-semibold border-y border-zinc-600">
			<td>
				<div className="my-2 h-10 w-10 rounded-full bg-zinc-400"></div>
			</td>
			<TdCommon content={collection} />
			<TdCommon content={`${deposits} ETH`} />
			<TdCommon content={`${apy}%`} />
			<TdCommon content={`${threshold}%`} />
			<TdCommon content={`${size} ETH`} />
			<td>
				<div className="w-full h-full flex items-center space-x-8">
					<ActionButton
						bg="bg-gradient-to-r from-primary to-secondary"
						content="Deposit"
					/>
					<ActionButton
						bg="bg-gradient-to-l from-primary to-secondary"
						content="Withdraw"
					/>
				</div>
			</td>
		</tr>
	);
};

export default Pool;
