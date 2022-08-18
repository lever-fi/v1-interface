import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { utils, BigNumber } from "ethers";
import axios from "axios";

import { getLoans } from "data/loans";

import ActionButton from "components/ActionButton";
import { ContractWrapper, ModalEntry } from "components/ModalEntry";
import NumberInput from "components/Inputs/Number";

const Borrow = ({ pool, collection }) => {
	const { poolAddress } = useParams();

	const [imageUrl, setImageUrl] = useState("");
	const [metadata, setMetadata] = useState("");
	const [tokenId, setTokenId] = useState(1);
	const [contributionAmount, setContributionAmount] = useState(0);
	// loan exist
	const [loanQueryResult, reexecuteLoanQueryResult] = useQuery(
		getLoans(
			{
				token_id: tokenId,
				pool_: {
					id: poolAddress,
				},
			},
			5,
			"desc",
			"created_at"
		)
	);
	// price
	const [tokenData, setTokenData] = useState({});
	const [canBorrow, setCanBorrow] = useState(false);

	useEffect(() => {
		const main = async () => {
			if (!pool || !pool.originalCollectionInstance) {
				return;
			}

			let metadataUrl = await pool.originalCollectionInstance.tokenURI(
				tokenId
			);
			metadataUrl = metadataUrl.replace(
				"ipfs://",
				"https://ipfs.io/ipfs/"
			);
			const { data } = await axios.get(metadataUrl);
			setMetadata(data);

			reexecuteLoanQueryResult();
		};

		main();
	}, [tokenId]);

	useEffect(() => {
		const main = async () => {
			if (!metadata) {
				return;
			}

			setImageUrl(
				metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")
			);
		};

		main();
	}, [metadata]);

	useEffect(() => {
		if (!loanQueryResult?.data?.loanEntities) {
			return;
		}

		if (
			loanQueryResult.data.loanEntities.length == 0 ||
			loanQueryResult.data.loanEntities[0].active == false
		) {
			setCanBorrow(true);
		}
	}, [loanQueryResult]);

	return (
		<>
			<div className="mt-4 space-y-8">
				<div className="flex flex-col items-center w-1/2 mx-auto space-y-4">
					<NumberInput
						name={"Token ID"}
						id={"token-id"}
						placeholder={9619}
						update={setTokenId}
					/>
					{/* <ModalEntry
						title={"Token ID"}
						value={9619}
						symbol={""}
						right={false}
					/> */}
					<div
						className="overflow-hidden bg-cover bg-center h-20 w-20 md:h-36 md:w-36 lg:h-44 lg:w-44"
						style={{
							backgroundImage: `url(${imageUrl})`,
							//backgroundImage: `url(${"https://img.seadn.io/files/898e79d4a38391abf25a3ba64118980c.png?fit=max&w=600"})`,
						}}
					/>
				</div>
				<div className="flex justify-between w-full px-4 mt-4">
					<div className="pr-1 md:pr-4 w-1/2 space-y-4">
						<ModalEntry
							title={"Minimum Deposit"}
							value={0}
							symbol={"ΞTH"}
							right={false}
						/>
						<ModalEntry
							title={"Interest Rate"}
							value={0.05}
							change={12.9}
							symbol={"%"}
							right={false}
						/>
						<ModalEntry
							title={"Collateral Coverage Ratio"}
							value={utils.formatEther(
								BigNumber.from(
									pool.collateralCoverageRatio || 0
								).mul(100)
							)}
							symbol={"%"}
							right={false}
						/>
					</div>
					<div className="pl-1 md:pl-4 w-1/2 space-y-4">
						<ModalEntry
							title={"Payment Frequency"}
							value={pool?.paymentFrequency / (3600 * 24) || 0}
							symbol={"days"}
							right={true}
						/>
						<ModalEntry
							title={"Loan Term"}
							value={pool?.loanTerm / (3600 * 24 * 7) || 0}
							symbol={"wks"}
							right={true}
						/>
					</div>
				</div>
				<div className="w-full">
					<div className="-mt-4 flex flex-col items-center w-1/2 mx-auto">
						<NumberInput
							name={"Contribute"}
							id={"contribute"}
							placeholder={12.99}
							symbol={"ΞTH"}
							update={setContributionAmount}
						/>
						{/* <ModalEntry
							title={"Contribute"}
							value={12.99}
							symbol={"ΞTH"}
							right={false}
						/> */}
					</div>
				</div>
			</div>

			<div className="mt-8 mb-6">
				<ActionButton
					bg={
						canBorrow
							? "bg-gradient-to-r from-primary to-secondary"
							: "bg-neutral-400"
					}
					content="Borrow"
					onClick={async () => {}}
				/>
			</div>
		</>
	);
};

export default Borrow;
