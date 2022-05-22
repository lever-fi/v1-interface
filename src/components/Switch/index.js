import { useState, useEffect } from "react";

const Switch = ({ onChecked, onUnchecked }) => {
	const [toggle, setToggle] = useState(false);
	const toggleClass = "transform translate-x-6";

	useEffect(() => {
		if (toggle) {
			onChecked();
		} else {
			onUnchecked();
		}
	}, [toggle]);

	return (
		<div
			className="w-12 h-6 flex items-center bg-gray-300 rounded-full cursor-pointer"
			onClick={() => {
				setToggle(!toggle);
			}}
		>
			{/* Switch */}
			<div
				className={`bg-white h-6 w-6 rounded-full shadow-md transform ${
					toggle ? toggleClass : ""
				}`}
			></div>
		</div>
	);
};

export default Switch;
