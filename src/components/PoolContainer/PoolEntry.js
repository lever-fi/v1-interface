import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

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

const PoolEntry = ({
	address = "0x00000000000000000000",
	collection = "LEVER",
	deposits = 0,
	apy = 1.5,
	size = 150,
	//signer,
}) => {
	let navigate = useNavigate();
	//const [poolContract, setPoolContract] = useState(null);
	const [depositAmt, setDepositAmt] = useState(
		ethers.utils.parseEther("0.02")
	);
	const [withdrawAmt, setWithdrawAmt] = useState(
		ethers.utils.parseEther("0.03")
	);

	/* useEffect(() => {
		const main = async () => {
			if (signer) {
				setPoolContract(
					generateContractInstance(address, poolAbi["abi"], signer)
				);
			}
		};

		main();
	}, [signer]); */
	return (
		<tr className="text-white font-semibold border-y border-zinc-600 transition-all duration-100 hover:bg-neutral-800">
			<td>
				<div className="my-2 h-10 w-10 rounded-full bg-zinc-400"></div>
			</td>
			<TdCommon content={collection} />
			<TdCommon content={`${deposits} ΞTH`} />
			<TdCommon content={`${apy}%`} />
			<TdCommon content={`${size} ΞTH`} />
			<td>
				<div className="w-full h-full flex items-center space-x-8">
					<ActionButton
						bg="bg-gradient-to-r from-primary to-secondary"
						content="Deposit"
						onClick={async () => {
							//if (poolContract) {
							navigate(`../${address}/overview`);
							/* const depositTxn = await poolContract.deposit({
									value: depositAmt,
								});
								await depositTxn.wait(); */
							//}
						}}
					/>
					<ActionButton
						bg="bg-gradient-to-l from-primary to-secondary"
						content="Withdraw"
						onClick={async () => {
							//if (poolContract) {
							navigate(`../${address}/manage`);
							//}
							/* if (poolContract) {
								const withdrawTxn = await poolContract.collect(
									withdrawAmt
								);
								await withdrawTxn.wait();
							} */
						}}
					/>
				</div>
			</td>
		</tr>
	);
};

export default PoolEntry;
