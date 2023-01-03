import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BigNumber, utils } from "ethers";

import round from "utils/round";

import ActionButton from "components/ActionButton";
import { ContractWrapper, ModalEntry } from "components/ModalEntry";

const Overview = ({ pool, collection }) => {
	let navigate = useNavigate();

	const [provider, setProvider] = useState(null);

	return (
		<>
			<div className="px-2">
				<div className="flex justify-between w-full px-4 mt-8">
					<div className="pr-1 md:pr-4 w-1/2 space-y-4">
						<ModalEntry
							title={"Liquidity"}
							value={round(utils.formatEther(pool?.balance || 0))}
							symbol={"ΞTH"}
							change={"0"}
							right={false}
						/>
						<ModalEntry
							title={"Interest Rate"}
							value={round(
								utils.formatEther(
									BigNumber.from(pool?.interestRate || 0).mul(
										100
									)
								)
							)}
							symbol={"%"}
							right={false}
						/>
						<ModalEntry
							title={"Collection Vol. (24h)"}
							value={19203.04}
							symbol={"ΞTH"}
							change={12.9}
							right={false}
						/>
					</div>
					<div className="pl-1 md:pl-4 w-1/2 space-y-4">
						<ModalEntry
							title={"APR"}
							value={4.19}
							symbol={"%"}
							right={true}
						/>
						<ModalEntry
							title={"Loan Term"}
							value={Math.floor(
								pool?.loanTerm / (3600 * 24 * 7) || 0
							)}
							symbol={"wks"}
							right={true}
						/>
						<ModalEntry
							title={"Pool Vol. (24h)"}
							value={201.01}
							symbol={"ΞTH"}
							change={-12.9}
							right={true}
						/>
					</div>
				</div>
				<div className="overflow-hidden px-4 mt-4">
					<ContractWrapper
						contracts={
							pool?.contracts ||
							[] /* [
							{
								title: "BAYC-LFI-LPP (Pool)",
								address:
									"0x7f268357a8c2552623316e2562d90e642bb538e5",
							},
							{
								title: "BAYC-LFI-LPT (Liquidity Token)",
								address:
									"0x7f268357a8c2552623316e2562d90e642bb538e5",
							},
							{
								title: "BAYC-LFI-LPW (Wrapped Collection)",
								address:
									"0x7f268357a8c2552623316e2562d90e642bb538e5",
							},
							{
								title: "BAYC-LFI-LPV (Vault)",
								address:
									"0x7f268357a8c2552623316e2562d90e642bb538e5",
							},
						] */
						}
					/>
				</div>
			</div>

			<div className="mt-8 mb-6 flex items-center space-x-4">
				<ActionButton
					bg="bg-gradient-to-r from-primary to-secondary"
					content="Borrow"
					onClick={() => {
						navigate("../borrow");
					}}
				/>
			</div>
		</>
	);
};

export default Overview;
