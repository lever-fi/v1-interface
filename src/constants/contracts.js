export const CONTRACT = (addressOrName, contractInterface) => ({
	addressOrName,
	contractInterface,
});

export const FACTORY_CONTRACT = () => CONTRACT("0x", "");

export const POOL_CONTRACT = (address) => CONTRACT(address, "");
