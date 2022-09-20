export const Stat = ({ title, value, desc, icon }) => {
	return (
		<div className="stat bg-base-200">
			<div className="stat-figure">{icon()}</div>
			<div className="stat-title">{title}</div>
			<div className="stat-value">{value}</div>
			<div className="stat-desc">{desc}</div>
		</div>
	);
};

export const StatContainer = ({ stats }) => {
	return (
		<div className="stats shadow rounded-xl">
			{stats.map((stat, idx) => (
				<Stat {...stat} key={idx} />
			))}
		</div>
	);
};
