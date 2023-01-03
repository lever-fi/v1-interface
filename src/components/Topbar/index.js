import { useSigner } from "wagmi";

import nftCollection from "abis/IERC721Minimal.json";
import generateContractInstance from "utils/generateContractInstance";

import NavElement from "./NavElement";
import ConnectWallet from "components/ConnectWallet";
import Logo from "assets/Logo.png";

import contractAddresses from "constants/contracts.json";

const NavElementList = [
	{
		name: "Pools",
		to: "/pools",
	},
];

const Topbar = (/* props */) => {
	const { data: signer } = useSigner();
	// const contract = useContract({
	// 	addressOrName: contractAddresses["nftCollection"],
	// 	contractInterface: nftCollection["abi"],
	// });

	return (
		<div>
			<div className="w-screen h-24 flex items-center justify-between px-12 py-4">
				<div className="w-36 h-full flex items-center">
					<img className="h-10" src={Logo} />
				</div>
				<div className="flex-1 h-full flex items-center space-x-4">
					{NavElementList.map((navElement, index) => {
						return <NavElement {...navElement} key={index} />;
					})}
				</div>
				<div className="h-full flex items-center">
					<ConnectWallet /* {...props} */ />
				</div>
			</div>
			<div
				className="cursor-pointer float-right h-10 mr-12"
				onClick={async () => {
					console.log(signer);
					if (signer) {
						const contract = generateContractInstance(
							contractAddresses["nftCollection"],
							nftCollection["abi"],
							signer
						);

						const approveTxn = await contract.setApprovalForAll(
							contractAddresses["marketplace"],
							true
						);
						await approveTxn.wait();
					}
				}}
			>
				<div className="relative w-full h-full flex items-center justify-center border-zinc-600 text-white rounded-lg border px-4 bg-gradient-to-br from-primary via-secondary to-secondary-transparent">
					<p className="font-semibold text-sm text-ellipsis overflow-hidden">
						{"Approve"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Topbar;
