import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";

import generateContractInstance from "utils/generateContractInstance";
import poolAbi from "abis/LeverV1Pool.json";

const TdCommon = ({ content }) => {
	return <td className="py-6">{content}</td>;
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

const BorrowerPoolEntry = ({
	address = "0x00000000000000000000",
	collection = "BAYC",
	minDeposit = 60,
	interestRate = 0.7,
	loanTerm = "4 weeks",
	paymentDue = "Weekly",
	signer,
}) => {
	const [poolContract, setPoolContract] = useState(null);
	const [borrowAmt, setBorrowAmt] = useState(ethers.utils.parseEther("0.01"));
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
			<TdCommon content={`${minDeposit}%`} />
			<TdCommon content={`${interestRate}%`} />
			<TdCommon content={`${loanTerm}`} />
			<TdCommon content={`${paymentDue}`} />
			<td>
				<div className="w-full h-full flex items-center space-x-8">
					<ActionButton
						bg="bg-gradient-to-r from-primary to-secondary"
						content="Borrow"
						onClick={async () => {
							if (poolContract) {
								const borrowTxn = await poolContract.borrow(
									BigNumber.from(tokenId),
									{
										value: borrowAmt,
									}
								);
								await borrowTxn.wait();
							}
						}}
					/>
				</div>
			</td>
		</tr>
	);
};

export default BorrowerPoolEntry;
