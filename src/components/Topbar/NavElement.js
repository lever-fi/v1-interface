const NavElement = ({ name, to }) => {
	return (
		<div className="relative">
			<p className="text-white font-medium cursor-pointer text-transparent bg-clip-text bg-gradient-to-bl from-neutral-100 to-neutral-300">
				{name}
			</p>
			<div className="absolute t-full w-full h-px bg-white"></div>
		</div>
	);
};

export default NavElement;
