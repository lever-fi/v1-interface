const Social = ({ name, icon, href }) => {
	return (
		<div className="tooltip" data-tip={name}>
			<button
				className="btn btn-circle bg-white hover:bg-base-100 p-2"
				onClick={() => {
					window.open(href, "_blank");
				}}
			>
				<img className="h-full" src={icon} />
			</button>
		</div>
	);
};

const Socials = ({ socials }) => {
	return (
		<div className="flex items-center space-x-2">
			{socials.map((social, index) => (
				<Social key={index} {...social} />
			))}
		</div>
	);
};

export default Socials;
