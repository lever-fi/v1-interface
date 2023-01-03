const Modal = (props) => {
	const onClick = () => {
		props.setActive(false);
	};

	return (
		<div
			className="relative z-10"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			{props.symbol ? (
				<div
					className="fixed inset-0 bg-neutral-900 bg-opacity-75 transition-opacity flex items-center justify-around overflow-hidden select-none"
					onClick={onClick}
				>
					<p className="text-white text-8xl md:text-[10rem] lg:text-[20rem] font-semibold opacity-10">
						{props.symbol}
					</p>
					<p className="text-white text-8xl md:text-[10rem] lg:text-[20rem] font-semibold opacity-10">
						{props.symbol}
					</p>
				</div>
			) : (
				<div
					className="fixed inset-0 bg-neutral-900 bg-opacity-75 transition-opacity"
					onClick={onClick}
				></div>
			)}

			<div className="fixed z-10 inset-0 overflow-hidden w-max mx-auto">
				<div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
