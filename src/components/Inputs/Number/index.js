import { useState } from "react";

const NumberInput = ({ disabled, name, id, placeholder, symbol, update }) => {
	const [value, setValue] = useState(placeholder);

	return (
		<div className="w-full space-y-1">
			<label
				className="block font-bold sm:text-sm md:text-lg text-electric-blue text-left"
				for={id}
			>
				{name}
			</label>
			<div className="h-12 rounded-md bg-neutral-700 p-4 flex items-center justify-between">
				<input
					className="bg-transparent text-white sm:text-sm md:text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline w-1/2"
					id={id}
					disabled={disabled}
					type="number"
					placeholder={placeholder}
					onChange={(e) => {
						setValue(e.target.value);
					}}
					onBlur={() => {
						if (!value) return;

						update(value);
					}}
				/>
				<p className="text-neutral-400 font-semibold text-xs">
					{symbol}
				</p>
			</div>
		</div>
	);
};

export default NumberInput;
