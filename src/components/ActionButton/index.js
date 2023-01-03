const ActionButton = ({ bg, content, onClick }) => {
	return (
		<div
			className={`cursor-pointer py-1 px-3 w-24 mx-auto pointer ${bg} text-white font-bold text-center rounded-lg`}
			onClick={onClick}
		>
			<p>{content}</p>
		</div>
	);
};

export default ActionButton;
