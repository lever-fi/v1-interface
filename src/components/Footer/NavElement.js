const NavElement = ({ name, to, targetId }) => {
	return (
		<div>
			{/* text-transparent bg-clip-text bg-gradient-to-bl from-neutral-100 to-neutral-300 */}
			<p
				className="text-[#C4C4C4] font-semibold text-sm cursor-pointer"
				onClick={() => {
					if (targetId) {
						document
							.getElementById(targetId)
							?.scrollIntoView({ behavior: "smooth" });
					} else {
						window.open(to, "_blank");
					}
				}}
			>
				{name}
			</p>
		</div>
	);
};

export default NavElement;
