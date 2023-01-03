import { observer } from "mobx-react-lite";

const Item = ({ principal, interest, due, state }) => {
	return (
		<li
			className={`step ${
				state == "PAID"
					? "step-success"
					: state === "PENDING"
					? "step-warning"
					: "step-error"
			} relative w-full`}
		>
			<div className="absolute text-left left-[15%] top-[25%] w-full">
				<p
					className={`font-semibold text-lg ${
						state == "PAID"
							? "text-success"
							: state === "PENDING"
							? "text-warning"
							: "text-error"
					}`}
				>
					{principal} ETH
					<sup className={`pl-1 text-xs font-medium`}>
						+{interest}%
					</sup>
				</p>
				<p className="text-xs text-neutral-content">{due}</p>
			</div>
		</li>
	);
};

const Schedule = observer(({ loan }) => {
	return (
		<ul
			className="steps steps-vertical w-full overflow-x-hidden"
			data-theme="dracula"
		>
			{loan.schedule.map((item, index) => (
				<Item {...item} key={index} />
			))}
		</ul>
	);
});

export default Schedule;
