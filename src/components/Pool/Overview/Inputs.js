export const RangeInput = ({
	max,
	min,
	step,
	placeholder,
	disabled,
	onChange,
}) => (
	<input
		type="range"
		{...{ max, min, step, placeholder, disabled, onChange }}
		className={`range range-sm ${
			!disabled ? "range-primary" : "range-base-100 cursor-default"
		}`}
	/>
);

export const NumberInput = ({ max, min, placeholder, disabled, className }) => (
	<input
		type="number"
		{...{ max, min, placeholder, disabled }}
		className={"input input-bordered w-full " + className}
	/>
	/* {symbol ? <span>{symbol}</span> : null} */
);
