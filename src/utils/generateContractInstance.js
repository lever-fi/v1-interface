import { ethers } from "ethers";

const generateContractInstance = (address, abi, signer) =>
	new ethers.Contract(address, abi, signer);

export default generateContractInstance;
