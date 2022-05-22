import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";

import PoolEntry from "./PoolEntry";
import BorrowerPoolEntry from "./BorrowerPoolEntry";
import BorrowerLoanEntry from "./BorrowerLoanEntry";
import Switch from "components/Switch";

import contractAddresses from "constants/contracts.json";

const Data = ({ poolView, lenderView, signer }) => {
	return (
		<>
			{lenderView && poolView ? (
				<>
					<PoolEntry
						address={contractAddresses["pool"]}
						collection={"BAYC"}
						deposits={0}
						apy={1.5}
						size={150}
						signer={signer}
					/>
					<PoolEntry
						address={0}
						collection={"DOODLE"}
						deposits={0}
						apy={1.5}
						size={150}
						signer={signer}
					/>
					<PoolEntry
						address={0}
						collection={"AZUKI"}
						deposits={0}
						apy={1.5}
						size={150}
						signer={signer}
					/>
					<PoolEntry
						address={0}
						collection={"PALS"}
						deposits={0}
						apy={1.5}
						size={150}
						signer={signer}
					/>
					<PoolEntry
						address={0}
						collection={"MOONBIRD"}
						deposits={0}
						apy={1.5}
						size={150}
						signer={signer}
					/>
					<PoolEntry
						address={0}
						collection={"OTHR"}
						deposits={0}
						apy={1.5}
						size={150}
						signer={signer}
					/>
					<PoolEntry
						address={0}
						collection={"PEC"}
						deposits={0}
						apy={1.5}
						size={150}
						signer={signer}
					/>
				</>
			) : poolView ? (
				<>
					<BorrowerPoolEntry
						address={contractAddresses["pool"]}
						collection={"BAYC"}
						minDeposit={60}
						interestRate={0.7}
						lonaTerm={"4 weeks"}
						paymentDue={"Weekly"}
						signer={signer}
					/>
					<BorrowerPoolEntry
						address={0}
						collection={"DOODLE"}
						minDeposit={60}
						interestRate={0.7}
						lonaTerm={"4 weeks"}
						paymentDue={"Weekly"}
						signer={signer}
					/>
					<BorrowerPoolEntry
						address={0}
						collection={"AZUKI"}
						minDeposit={60}
						interestRate={0.7}
						lonaTerm={"4 weeks"}
						paymentDue={"Weekly"}
						signer={signer}
					/>
					<BorrowerPoolEntry
						address={0}
						collection={"PALS"}
						minDeposit={60}
						interestRate={0.7}
						lonaTerm={"4 weeks"}
						paymentDue={"Weekly"}
						signer={signer}
					/>
					<BorrowerPoolEntry
						address={0}
						collection={"MOONBIRD"}
						minDeposit={60}
						interestRate={0.7}
						lonaTerm={"4 weeks"}
						paymentDue={"Weekly"}
						signer={signer}
					/>
					<BorrowerPoolEntry
						address={0}
						collection={"OTHR"}
						minDeposit={60}
						interestRate={0.7}
						lonaTerm={"4 weeks"}
						paymentDue={"Weekly"}
						signer={signer}
					/>
					<BorrowerPoolEntry
						address={0}
						collection={"PEC"}
						minDeposit={60}
						interestRate={0.7}
						lonaTerm={"4 weeks"}
						paymentDue={"Weekly"}
						signer={signer}
					/>
				</>
			) : (
				<>
					<BorrowerLoanEntry
						address={contractAddresses["pool"]}
						collection={"BAYC"}
						balance={60}
						secured={true}
						interestRate={0.7}
						loanTerm={"2 weeks"}
						compoundsIn={"00:36"}
						signer={signer}
					/>
					<BorrowerLoanEntry
						address={0}
						collection={"DOODLE"}
						balance={60}
						secured={true}
						interestRate={0.7}
						loanTerm={"2 weeks"}
						compoundsIn={"00:36"}
						signer={signer}
					/>
					<BorrowerLoanEntry
						address={0}
						collection={"AZUKI"}
						balance={60}
						secured={true}
						interestRate={0.7}
						loanTerm={"2 weeks"}
						compoundsIn={"00:36"}
						signer={signer}
					/>
					<BorrowerLoanEntry
						address={0}
						collection={"PALS"}
						balance={60}
						secured={true}
						interestRate={0.7}
						loanTerm={"2 weeks"}
						compoundsIn={"00:36"}
						signer={signer}
					/>
					<BorrowerLoanEntry
						address={0}
						collection={"MOONBIRD"}
						balance={60}
						secured={true}
						interestRate={0.7}
						loanTerm={"2 weeks"}
						compoundsIn={"00:36"}
						signer={signer}
					/>
					<BorrowerLoanEntry
						address={0}
						collection={"OTHR"}
						balance={60}
						secured={true}
						interestRate={0.7}
						loanTerm={"2 weeks"}
						compoundsIn={"00:36"}
						signer={signer}
					/>
					<BorrowerLoanEntry
						address={0}
						collection={"PEC"}
						balance={60}
						secured={true}
						interestRate={0.7}
						loanTerm={"2 weeks"}
						compoundsIn={"00:36"}
						signer={signer}
					/>
				</>
			)}
		</>
	);
};

const PoolContainer = ({ instance, provider, signer }) => {
	const [pools, setPools] = useState([]);
	const [loans, setLoans] = useState([]);
	const [poolView, setPoolView] = useState(1);
	const [lenderView, setLenderView] = useState(1);

	useEffect(() => {
		// set pools
	}, []);

	useEffect(() => {
		if (lenderView === 1 && poolView === 1) {
			// set lender pools
		}
		if (lenderView === 0 && poolView === 0) {
			// set borrower outstanding loans
		}
		if (lenderView === 0 && poolView === 1) {
			// set borrower pools
		}
	}, [poolView, lenderView]);

	return (
		<div className="w-screen flex items-center justify-center">
			<div className="w-2/3">
				<div className="flex items-center space-x-4 w-max">
					<p className="w-full text-white text-2xl font-bold">
						{poolView === 1 ? "Pools" : "Loans"}
					</p>
					{lenderView === 0 ? (
						<div className="px-4">
							<Switch
								onChecked={() => {
									setPoolView(0);
								}}
								onUnchecked={() => {
									setPoolView(1);
								}}
							/>
						</div>
					) : null}
				</div>
				<div className="w-full my-4 h-108 relative">
					<div className="absolute w-full h-full inset-0 bg-gradient-to-br from-primary via-secondary to-secondary-transparent rounded-lg blur opacity-80"></div>
					<div className="relative mt-4 w-full h-full flex items-center justify-center">
						<div className="w-full h-full border-zinc-600 rounded-lg border bg-neutral-900 py-4 pl-8">
							<div className="w-full h-full overflow-y-auto pr-8 no-scrollbar">
								<table className="table-fixed w-full">
									<thead>
										{lenderView && poolView ? (
											<tr className="sticky top-0 text-left text-sm text-slate-400 border-b border-zinc-600">
												<th className="bg-neutral-900 w-20 h-full pb-4"></th>
												<th className="bg-neutral-900 h-full pb-4">
													Collection
												</th>
												<th className="bg-neutral-900 h-full pb-4">
													Deposited
												</th>
												<th className="bg-neutral-900 h-full pb-4">
													~ APY
												</th>
												<th className="bg-neutral-900 h-full pb-4">
													Pool Size
												</th>
												<th className="bg-neutral-900 w-60 h-full pb-4"></th>
											</tr>
										) : poolView ? (
											<tr className="sticky top-0 text-left text-sm text-slate-400 border-b border-zinc-600">
												<th className="bg-neutral-900 w-20 h-full pb-4"></th>
												<th className="bg-neutral-900 h-full pb-4">
													Collection
												</th>
												<th className="bg-neutral-900 h-full pb-4">
													Min Deposit.
												</th>
												<th className="bg-neutral-900 h-full pb-4">
													Interest Rate
												</th>
												<th className="bg-neutral-900 h-full pb-4">
													Loan Term
												</th>
												<th className="bg-neutral-900 h-full pb-4">
													Payments Due
												</th>
												<th className="bg-neutral-900 w-40 h-full pb-4"></th>
											</tr>
										) : (
											<tr className="sticky top-0 text-left text-sm text-slate-400 border-b border-zinc-600">
												<th className="bg-neutral-900 w-20 h-full pb-4"></th>
												<th className="bg-neutral-900 h-full pb-4">
													Collection
												</th>
												<th className="bg-neutral-900 h-full pb-4">
													Total Balance
												</th>
												<th className="bg-neutral-900 h-full pb-4">
													Secured
												</th>
												<th className="bg-neutral-900 h-full pb-4">
													Interest Rate
												</th>
												<th className="bg-neutral-900 h-full pb-4">
													Loan Term
												</th>
												<th className="bg-neutral-900 h-full pb-4">
													Compounds In
												</th>
												<th className="bg-neutral-900 w-40 h-full pb-4"></th>
											</tr>
										)}
									</thead>
									<tbody>
										<Data
											{...{
												poolView,
												lenderView,
												signer,
											}}
										/>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center space-x-4 w-max float-right">
					<p className="w-full text-white text-sm font-bold">
						{lenderView === 1 ? "Lender" : "Borrower"}
					</p>
					<div className="px-4">
						<Switch
							onChecked={() => {
								setLenderView(0);
							}}
							onUnchecked={() => {
								setLenderView(1);
								setPoolView(1);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PoolContainer;
