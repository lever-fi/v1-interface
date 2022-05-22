import { useState } from "react";
import { ethers } from "ethers";
import web3Modal from "utils/web3Modal";

const ConnectWallet = ({
	setConnected,
	address,
	instance,
	provider,
	signer,
	setAddress,
	setInstance,
	setProvider,
	setSigner,
}) => {
	const [hovered, setHovered] = useState(false);

	return (
		<div
			className="relative w-full h-10 cursor-pointer"
			onClick={async () => {
				if (localStorage.getItem("isWalletConnected") === "true") {
					if (instance) {
						localStorage.setItem("isWalletConnected", false);
						await web3Modal.clearCachedProvider();
						window.location.reload();
					}
				} else {
					const _instance = await web3Modal.connect();
					const _provider = new ethers.providers.Web3Provider(
						_instance
					);
					const _signer = _provider.getSigner();

					setInstance(_instance);
					setProvider(_provider);
					setSigner(_signer);

					setAddress(await _signer.getAddress());
					localStorage.setItem("isWalletConnected", true);
					setConnected(true);
				}
			}}
			onMouseEnter={() => {
				setHovered(true);
			}}
			onMouseLeave={() => {
				setHovered(false);
			}}
		>
			<div className="absolute w-full h-full inset-0 bg-gradient-to-br from-primary via-secondary to-secondary-transparent rounded-lg blur opacity-80"></div>
			<div className="relative w-full h-full flex items-center justify-center border-zinc-600 rounded-lg border bg-zinc-900">
				<div
					className={`w-full text-center transition-all duration-200 px-4 ${
						hovered && !address
							? "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
							: "text-white"
					}`}
				>
					<p className="font-semibold text-sm text-ellipsis overflow-hidden">
						{address || "Connect"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ConnectWallet;
