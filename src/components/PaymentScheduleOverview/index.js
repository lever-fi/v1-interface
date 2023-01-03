const Bubble = ({ principal, interest, due, paid }) => {
	return (
		<div className="relative">
			<div className="flex items-center">
				{paid ? (
					<div className="rounded-full w-5 h-5 bg-[#4BF690]"></div>
				) : (
					<div className="rounded-full w-5 h-5 bg-[#D9D9D9]"></div>
				)}
			</div>
			<div className="absolute whitespace-nowrap text-left">
				{paid ? (
					<p className="text-[#4BF690] text-sm font-bold">
						{interest + principal} ΞTH
					</p>
				) : (
					<p className="text-[#D9D9D9] text-sm font-bold">
						{interest + principal} ΞTH
					</p>
				)}
				<p className="text-[#434343] text-xs font-bold">{due}</p>
			</div>
		</div>
	);
};

const Interval = ({ interval }) => {
	return (
		<div className="w-full h-px border-2 border-dashed flex items-center justify-center border-[#434343]">
			<div className="w-full bg-[#222222] px-3 text-[#434343] text-sm">
				<p>{interval}</p>
			</div>
		</div>
	);
};

const PaymentScheduleOverview = ({ payments }) => {
	return (
		<div className="relative rounded-lg w-full h-24 bg-[#222222] flex items-center justify-center px-4">
			<div className="w-full px-4 flex items-center justify-between">
				{payments.map((payment, index) => {
					return (
						<div className="w-full flex items-center justify-center">
							{index == 0 ? null : (
								<div className="w-full">
									<Interval
										interval={payment.interval}
										key={index}
									/>
								</div>
							)}
							<Bubble {...payment} key={index} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default PaymentScheduleOverview;
