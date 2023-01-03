const Banner = ({ bg, logo }) => {
	return (
		<div className="my-2 py-4 w-full">
			<div
				className="overflow-hidden bg-cover bg-center h-16 md:h-24 lg:h-32 flex items-center justify-center"
				style={{
					backgroundImage: `url(${bg})`,
				}}
			>
				<div
					className="overflow-hidden bg-cover bg-center h-12 w-12 md:h-16 md:w-16 lg:h-24 lg:w-24"
					style={{
						backgroundImage: `url(${logo})`,
					}}
				/>
			</div>
		</div>
	);
};

export default Banner;
