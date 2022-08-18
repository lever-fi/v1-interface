const InfoDisplayItem = ({ title, value }) => {
	return (
		<div className="w-full">
			<p className="text-white font-semibold">{title}</p>
			<div className="appearance-none border border-zinc-600 rounded w-full py-2 px-3 bg-neutral-900 leading-tight focus:outline-none focus:shadow-outline">
				<p className="text-gray-700 text-lg">{value}</p>
			</div>
		</div>
	);
};

export default InfoDisplayItem;
