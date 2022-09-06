import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { utils, BigNumber } from "ethers";
import axios from "axios";

import { getLoans } from "data/loans";

import ActionButton from "components/ActionButton";
import { ContractWrapper, ModalEntry } from "components/ModalEntry";
import NumberInput from "components/Inputs/Number";
import PaymentScheduleOverview from "components/PaymentScheduleOverview";

const Repay = ({ pool, collection }) => {
	const { poolAddress } = useParams();

	const [imageUrl, setImageUrl] = useState("");
	const [metadata, setMetadata] = useState("");
	const [tokenId, setTokenId] = useState(1);
	const [repaymentAmount, setRepaymentAmount] = useState(0);
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
			if (!pool || !pool?.originalCollectionInstance) {
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
	}, [pool, tokenId]);

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
			<div className="mt-8 space-y-8 px-2">
				<div className="flex justify-between w-full px-4 mt-4">
					<div className="pr-1 md:pr-4 w-1/2 space-y-4">
						<ModalEntry
							title={"Principal"}
							value={0}
							symbol={"ΞTH"}
							right={false}
						/>
						<ModalEntry
							title={"Ownership"}
							value={0.05}
							symbol={"%"}
							right={false}
						/>
						<ModalEntry
							title={"Initialization"}
							value={"04/25/23 09:13:00"}
							right={false}
						/>
					</div>
					<div className="pl-1 md:pl-4 w-1/2 space-y-4">
						<ModalEntry
							title={"Interest Rate"}
							value={0.05}
							symbol={"%"}
							right={true}
						/>
						<ModalEntry
							title={"Compounds in"}
							value={"10:00:02"}
							symbol={"DD:HH:MM"}
							right={true}
						/>
						<ModalEntry
							title={"Expiration"}
							value={"04/16/23 23:28:00"}
							right={true}
						/>
					</div>
				</div>
				<div className="w-full">
					<div className="-mt-4 flex flex-col items-center w-1/2 mx-auto">
						<NumberInput
							name={"Repay"}
							id={"repay"}
							placeholder={12.99}
							min={0}
							symbol={"ΞTH"}
							update={setRepaymentAmount}
						/>
						{/* Generate payment plan */}
						{/* <ModalEntry
							title={"Contribute"}
							value={12.99}
							symbol={"ΞTH"}
							right={false}
						/> */}
					</div>
				</div>
			</div>

			<div className="px-6 my-6">
				<PaymentScheduleOverview
					payments={[
						{
							principal: 2.87,
							interest: 0.0,
							interval: "0 days",
							due: "10/29/22",
							paid: true,
						},
						{
							principal: 2.87,
							interest: 0.02,
							interval: "7 days",
							due: "10/29/22",
							paid: false,
						},
						{
							principal: 2.87,
							interest: 0.05,
							interval: "7 days",
							due: "10/29/22",
							paid: false,
						},
						{
							principal: 2.87,
							interest: 0.01,
							interval: "7 days",
							due: "10/29/22",
							paid: false,
						},
					]}
				/>
			</div>

			<div className="mb-4">
				<ActionButton
					bg={
						canBorrow
							? "bg-gradient-to-r from-primary to-secondary"
							: "bg-neutral-400"
					}
					content="Repay"
					onClick={async () => {}}
				/>
			</div>
		</>
	);
};

export default Repay;
