const SectionHeading = ({ heading }) => {
	return (
		<p className="w-fit text-transparent bg-clip-text bg-gradient-to-l to-primary from-secondary font-bold text-lg">
			{heading}
		</p>
	);
};

const SectionEntry = ({ heading, href }) => {
	return (
		<p
			className="text-[#C4C4C4] cursor-pointer text-sm font-semibold"
			onClick={() => {
				window.location = href;
			}}
		>
			{heading}
		</p>
	);
};

const Section = ({ heading, entries }) => {
	return (
		<div className="flex flex-col items-end text-right">
			<SectionHeading heading={heading} />
			<div className="h-px"></div>
			<div>
				{entries.map((entry, index) => (
					<SectionEntry {...entry} key={index} />
				))}
			</div>
		</div>
	);
};

export default Section;
