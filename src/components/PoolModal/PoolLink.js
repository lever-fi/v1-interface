const PoolLink = ({ name, icon, href }) => {
	return (
		<div
			className="h-8 w-8 rounded-full overflow-hidden bg-cover bg-center cursor-pointer"
			style={{
				backgroundImage: `url(${icon})`,
			}}
			onClick={() => {
				window.open(href, "_blank");
			}}
		></div>
	);
};

export default PoolLink;
