import { useState, useEffect } from "react";
import { BigNumber, utils } from "ethers";

import { toastPromise, toastNormal } from "utils/toast";
import round from "utils/round";

import ActionButton from "components/ActionButton";
import { ModalEntry } from "components/ModalEntry";
import NumberInput from "components/Inputs/Number";

import { ReactComponent as SwapOutlined } from "assets/SwapOutlined.svg";

const Manage = ({ pool, collection }) => {
	const [tokenInfo, setTokenInfo] = useState({
		balance: BigNumber.from(0),
		totalSupply: BigNumber.from(0),
	});
	const [action, setAction] = useState(true);
	const [depositAmount, setDepositAmount] = useState(0);
	const [collectAmount, setCollectAmount] = useState(0);

	useEffect(() => {
		const main = async () => {
			if (!pool?.liquidityTokenInstance) {
				return;
			}

			const balance = await pool.liquidityTokenInstance.balanceOf(
				await pool._signer.getAddress()
			);
			const totalSupply = await pool.liquidityTokenInstance.totalSupply();

			setTokenInfo({
				balance: balance || 0,
				totalSupply: totalSupply || 0,
			});
		};

		main();
	}, [pool]);
	return (
		<>
			<div className="space-y-8">
				<div className="flex justify-between w-full px-4 mt-8">
					<div className="pr-1 md:pr-4 w-1/2 space-y-4">
						<ModalEntry
							title={"Balance"}
							value={round(utils.formatEther(tokenInfo?.balance))}
							symbol={collection?.token?.symbol || "LEVER"}
							change={"0"}
							right={false}
						/>
						<ModalEntry
							title={"Pool Share"}
							value={round(
								tokenInfo.totalSupply
									.div(
										tokenInfo.balance == 0
											? 1
											: tokenInfo.balance
									)
									.mul(100)
									.toString()
							)}
							symbol={"%"}
							right={false}
						/>
					</div>
					<div className="pl-1 md:pl-4 w-1/2 space-y-4">
						<ModalEntry
							title={"Current Yield"}
							value={round(
								tokenInfo.totalSupply
									.div(
										tokenInfo.balance == 0
											? 1
											: tokenInfo.balance
									)
									.mul(100)
									.toString()
							)}
							symbol={"%"}
							right={true}
						/>
						<ModalEntry
							title={"Yield (1m)"}
							value={10.88}
							symbol={"ΞTH"}
							change={12.9}
							right={true}
						/>
					</div>
				</div>
				<div
					className={`flex ${
						action ? "flex-col" : "flex-col-reverse"
					} items-center w-1/2 mx-auto`}
				>
					<NumberInput
						disabled={!action}
						name={action ? "Deposit" : ""}
						id={"deposit"}
						placeholder={12.99}
						symbol={"ΞTH"}
						update={setDepositAmount}
					/>
					<div
						className="w-8 h-8 p-2 mt-3 mb-2 rounded-full bg-neutral-700 cursor-pointer"
						onClick={() => {
							setAction(!action);
						}}
					>
						<SwapOutlined className="fill-electric-blue w-full h-full" />
					</div>
					<NumberInput
						disabled={action}
						name={action ? "" : "Collect"}
						id={"collect"}
						placeholder={1920.2}
						symbol={collection?.token?.symbol || "LEVER-LFI-LPT"}
						update={setCollectAmount}
					/>
				</div>
			</div>

			<div className="mt-8 mb-6">
				<ActionButton
					bg="bg-gradient-to-r from-primary to-secondary"
					content="Confirm"
					onClick={async () => {
						// action == true: deposit
						let promiseTxn;
						let options;

						if (action) {
							if (
								utils
									.parseEther(depositAmount.toString())
									.lt(pool.minDeposit)
							) {
								toastNormal(
									`Deposit must be ≥ ${utils.formatEther(
										pool.minDeposit
									)} ETH.`
								);
								return;
							}

							options = {
								pending: "Attempting to deposit ETH.",
								success:
									"ETH has been successfully deposited. Please add LPT to your wallet.",
								error:
									"Unable to deposit ETH. Please try again!",
							};

							promiseTxn = await pool.instance.deposit({
								value: utils.parseEther(
									depositAmount.toString()
								),
							});
						} else {
							if (collectAmount <= 0) {
								return;
							}

							options = {
								pending: "Attempting to collect ETH.",
								success: "ETH has been successfully collected.",
								error:
									"Unable to collect ETH. Please try again!",
							};

							promiseTxn = await pool.instance.collect(
								utils.parseEther(collectAmount.toString())
							);
						}

						await toastPromise(promiseTxn.wait(), options);
					}}
				/>
			</div>
		</>
	);
};

export default Manage;
