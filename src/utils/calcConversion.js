// incoming eth, eth balance of liquidity pool, total supply of liqudity tokens
/**
 * Convert eth to num tokens
 * @param w incoming eth for conversion
 * @param x eth value of pool post contribution
 * @param y total supply of liquidity tokens
 * @returns token amount
 */

// 1 eth: 100 tokens
// 1 token: .01 eth
export const getRates = () => ({
	eth: 100,
	token: 1,
});

export const ethToToken = (w, x, y) => {
	if (y === 0) {
		return w;
	}

	const ratio = w / x;
	return (ratio * y) / (1 - ratio);
};

// incoming tokens, total value of pool, total supply of liquidity tokens
/**
 * Convert number of tokens to eth
 * @param w count of liquidity tokens to be converted
 * @param x eth value of assets under pool control
 * @param y total supply of liquidity tokens
 * @returns eth amount
 */
export const tokenToEth = (w, x, y) => {
	return (w / y) * x;
};
