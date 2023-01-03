import { MULTI_POOL_QUERY, SINGLE_POOL_QUERY } from "./queries";

const resProps = `
    id
    address
    created_at
    synthetic_collection {
        id
        address
        name
        symbol
    }
    original_collection {
        id
        address
        name
        symbol
    }
    token {
        id
        address
        name
        symbol
    }
    collateral_coverage_ratio
    interest_rate
    charge_interval
    burn_rate
    loan_term
    min_liquidity
    min_deposit
    payment_frequency
`;

const getPools = (where, first, orderDirection, orderBy) => {
	// afterFirst = orderDirection || orderBy;
	// afterWhere = first || afterFirst;
	const query = MULTI_POOL_QUERY(`{
        poolEntities(${where ? "where: $where," : ""} ${
		first ? "first: $first," : ""
	} ${orderDirection ? "orderDirection: $orderDirection," : ""} ${
		orderBy ? "orderBy: $orderBy" : ""
	}) {
            ${resProps}
        }
    }`);

	let variables = {};

	if (where) {
		variables.where = where;
	}
	if (first) {
		variables.first = first;
	}
	if (orderDirection) {
		variables.orderDirection = orderDirection;
	}
	if (orderBy) {
		variables.orderBy = orderBy;
	}

	return { query, variables };
};

const getPool = (where) => {
	const query = SINGLE_POOL_QUERY(`{
        poolEntities(where: $where, first: 1) {
            ${resProps}
        }
    }`);

	const variables = {
		where,
	};

	return { query, variables };
};

const getPoolByAddress = (address) => {
	const query = SINGLE_POOL_QUERY(`
    {
        poolEntities(where: $where, first: 1) {
            ${resProps}
        }
    }`);

	const variables = {
		where: { address },
	};

	return { query, variables };
};

const getPoolByCollection = (collection) => {
	const query = SINGLE_POOL_QUERY(`
    {
        poolEntities(where: $where, first: 1) {
            ${resProps}
        }
    }`);

	const variables = {
		where: {
			original_collection_: {
				id: collection,
			},
		},
	};

	return { query, variables };
};

export {
	getPools,
	getPool,
	getPoolByAddress,
	getPoolByCollection,
	resProps as PoolQueryResProps,
};
