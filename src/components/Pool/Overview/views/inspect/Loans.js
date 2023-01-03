import { observer } from "mobx-react-lite";

import { Table } from "components/Table";

const Row = ({
	loanId,
	tokenId,
	principal,
	interest,
	interestRate,
	ownership,
	balance,
	nextInstallment,
	schedule,
	key,
	loan,
	setActionIndex,
}) => {
	return () => (
		<tr key={key}>
			<th>
				<div
					className="ml-4 overflow-hidden bg-cover bg-center rounded-full h-10 w-10 border border-white"
					style={{
						backgroundImage: `url(${"https://ipfs.io/ipfs/QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi"})`,
					}}
				></div>
			</th>
			<td>
				<div>
					<div className="font-bold">{tokenId}</div>
					<div className="text-sm opacity-50">#{loanId}</div>
				</div>
			</td>
			<td>{balance} ETH</td>
			<td>{interestRate}%</td>
			<td>{ownership} %</td>
			<td>{nextInstallment}</td>
			<td>
				<button
					className="w-12 btn text-white font-semibold py-2 px-4 bg-gradient-to-r from-primary to-secondary"
					onClick={() => {
						loan.update({
							loan_id: loanId,
							token_id: tokenId,
							principal,
							interest,
							interest_rate: interestRate,
							next_installment: nextInstallment,
							ownership,
							schedule,
						});
						setActionIndex(2);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-6 h-6"
					>
						<path
							fillRule="evenodd"
							d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</td>
		</tr>
	);
};

const Loans = observer(({ loans, loan, setActionIndex }) => {
	return (
		<div className="card w-full bg-base-200 overflow-y-auto overflow-x-auto no-scrollbar rounded-xl">
			<Table
				headers={[
					null,
					"Token ID",
					"Balance",
					"Interest Rate",
					"Ownership",
					"Upcoming",
					"Visit",
					null,
				]}
				rows={loans.loans.map((_loan, index) =>
					Row({
						...{
							loanId: _loan.loan_id,
							tokenId: _loan.token_id,
							principal: _loan.principal,
							interest: _loan.interest,
							interestRate: _loan.interest_rate,
							ownership: _loan.ownership,
							balance: _loan.principal + _loan.interest,
							nextInstallment: _loan.next_installment,
							schedule: _loan.schedule,
							key: index,
							loan,
							setActionIndex,
						},
					})
				)}
			/>
		</div>
	);
});

export default Loans;
