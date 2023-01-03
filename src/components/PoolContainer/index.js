import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ethers, utils, BigNumber } from "ethers";
import { useQuery } from "urql";
import axios from "axios";

import contractAddresses from "constants/contracts.json";

import round from "utils/round";

import { getPools } from "data/pools";
import { getLoans } from "data/loans";

import PoolEntry from "./PoolEntry";
import BorrowerPoolEntry from "./BorrowerPoolEntry";
import BorrowerLoanEntry from "./BorrowerLoanEntry";
import Switch from "components/Switch";

const Data = ({ poolView, lenderView, signer, pools, loans }) => {
	return (
		<>
			{lenderView && poolView ? (
				<>
					{pools && pools.length > 0 ? (
						<>
							{pools.map((pool) => {
								return (
									<PoolEntry
										key={pool.id}
										address={pool.address}
										collection={
											pool.original_collection.symbol
										}
										deposits={"0"} // how much have you deposited
										apy={4.5}
										liquidity={"0"} // balance
										size={"0"} // size
										signer={signer}
									/>
								);
							})}
						</>
					) : //<p>No pools yet.</p>
					null}
				</>
			) : poolView ? (
				<>
					{pools && pools.length > 0 ? (
						<>
							{pools.map((pool) => {
								return (
									<BorrowerPoolEntry
										key={pool.id}
										address={pool.address}
										collection={
											pool.original_collection.symbol
										}
										coverageRatio={utils.formatEther(
											BigNumber.from(
												pool.collateral_coverage_ratio
											).mul(100)
										)}
										interestRate={utils.formatEther(
											BigNumber.from(
												pool.interest_rate
											).mul(100)
										)}
										loanTerm={
											`${Math.floor(
												pool.loan_term / (3600 * 24)
											)} Days` /* pool.loan_term */
										}
										chargeFrequency={pool.charge_interval}
										paymentFrequency={
											(() => {
												const days = Math.floor(
													pool.payment_frequency /
														(3600 * 24)
												);

												return days == 7
													? "Weekly"
													: `${days} Days`;
											})() /* pool.payment_frequency */
										}
										signer={signer}
									/>
								);
							})}
						</>
					) : //<p>No pools yet.</p>
					null}
				</>
			) : (
				<>
					{loans && loans.length > 0 ? (
						<>
							{loans.map((loan) => {
								return (
									<BorrowerLoanEntry
										address={loan.pool.address}
										collection={
											loan.pool.original_collection.symbol
										}
										balance={loan.balance}
										secured={loan.status}
										interestRate={"0.7"}
										loanTerm={`0 Days`}
										compoundsIn={"00:36"}
										signer={signer}
									/>
								);
							})}
						</>
					) : null}
					{/* <BorrowerLoanEntry
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
					/> */}
				</>
			)}
		</>
	);
};

const PoolContainer = ({ instance, provider, signer }) => {
	const [pools, setPools] = useState([]);
	const [loans, setLoans] = useState([]);
	const [signerAddress, setSignerAddress] = useState("");
	const [poolView, setPoolView] = useState(1);
	const [lenderView, setLenderView] = useState(1);
	const [popularPoolQueryResult, reexecutePopularPoolQueryResult] = useQuery(
		getPools(null, 10, "asc", "created_at")
	);
	const [loansQueryResult, reexecuteLoansQueryResult] = useQuery(
		getLoans(`{ account_: { id: ${signerAddress} } }`)
	);

	useEffect(() => {
		const main = async () => {
			if (signer) {
				console.log("SET SIGNER:", await signer.getAddress());
				setSignerAddress(await signer.getAddress());
			}
		};

		main();
	}, [signer]);

	useEffect(() => {
		if (signerAddress && signerAddress !== "") {
			console.log("SIGNER ADDRESS:", signerAddress);
			reexecuteLoansQueryResult();
		}
	}, [signerAddress]);

	useEffect(() => {
		setPools(popularPoolQueryResult?.data?.poolEntities || []);
	}, [popularPoolQueryResult]);

	useEffect(() => {
		setLoans(loansQueryResult?.data?.loanEntities);
	}, [loansQueryResult]);

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
			<div className="absolute">
				<Outlet />
			</div>
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
													Coverage Ratio
												</th>
												<th className="bg-neutral-900 h-full pb-4">
													Interest Rate
												</th>
												<th className="bg-neutral-900 h-full pb-4">
													Loan Term
												</th>
												<th className="bg-neutral-900 h-full pb-4">
													Payment Frequency
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
													Next Charge
												</th>
												<th className="bg-neutral-900 w-40 h-full pb-4"></th>
											</tr>
										)}
									</thead>
									<tbody>
										<Data
											{...{
												pools,
												poolView,
												lenderView,
												signer,
												loans,
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
