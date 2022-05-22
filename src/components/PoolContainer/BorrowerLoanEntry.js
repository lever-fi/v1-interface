import { useState, useEffect } from "react";
import { BigNumber } from "ethers";

import generateContractInstance from "utils/generateContractInstance";
import poolAbi from "abis/LeverV1Pool.json";

const TdCommon = ({ content, className }) => {
	return <td className={`py-6 ${className}`}>{content}</td>;
};

const ActionButton = ({ bg, content, onClick }) => {
	return (
		<div
			className={`cursor-pointer py-1 px-3 w-1/2 pointer ${bg} text-white font-bold text-center rounded-lg`}
			onClick={onClick}
		>
			<p>{content}</p>
		</div>
	);
};

const BorrowerLoanEntry = ({
	address = "0x00000000000000000000",
	collection = "BAYC",
	balance = 60,
	secured = true,
	interestRate = 0.7,
	loanTerm = "2 weeks",
	compoundsIn = "00:36",
	signer,
}) => {
	const [poolContract, setPoolContract] = useState(null);
	const [repayAmt, setRepayAmt] = useState(0);
	const [tokenId, setTokenId] = useState(0);

	useEffect(() => {
		const main = async () => {
			if (signer) {
				setPoolContract(
					generateContractInstance(address, poolAbi["abi"], signer)
				);
			}
		};

		main();
	}, [signer]);

	return (
		<tr className="text-white font-semibold border-y border-zinc-600 transition-all duration-100 hover:bg-neutral-800">
			<td>
				<div className="my-2 h-10 w-10 rounded-full bg-zinc-400"></div>
			</td>
			<TdCommon content={collection} />
			<TdCommon content={`${balance} ETH`} />
			<TdCommon content={`${secured ? "Yes" : "No"}`} />
			<TdCommon content={`${interestRate}%`} />
			<TdCommon content={`${loanTerm}`} />
			<TdCommon content={`${compoundsIn}`} />
			<td>
				<div className="w-full h-full flex items-center space-x-8">
					<ActionButton
						bg="bg-gradient-to-r from-primary to-secondary"
						content="Repay"
						onClick={async () => {
							if (poolContract) {
								const repayTxn = await poolContract.repay(
									tokenId,
									{
										value: repayAmt,
									}
								);
								await repayTxn.wait();
							}
						}}
					/>
				</div>
			</td>
		</tr>
	);
};

export default BorrowerLoanEntry;
