export const RangeInput = ({ max, min, placeholder, disabled, onChange }) => (
	<input
		type="range"
		min={min}
		max={max}
		placeholder={placeholder}
		disabled={disabled}
		className={`range range-sm ${
			!disabled ? "range-primary" : "range-base-100 cursor-default"
		}`}
		onChange={onChange}
	/>
);

export const NumberInput = ({ max, min, placeholder, disabled }) => (
	<input
		type="number"
		{...{ max, min, placeholder, disabled }}
		className="input input-bordered w-full"
	/>
	/* {symbol ? <span>{symbol}</span> : null} */
);
