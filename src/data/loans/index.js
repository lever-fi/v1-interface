import { MULTI_LOAN_QUERY, SINGLE_LOAN_QUERY } from "./queries";

const resProps = `
    id
    created_at
    pool {
        address
        original_collection {
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
    }
    account {
        id
    }
    principal
    interest
    daily_percent_rate
    payment_frequency
    loan_term
    finalized_at
    active
    repayment_allowance
    installments {
        amount
        due_at
    }
    installments_remaining
    collateral
    token_id
    status
`;

const getLoans = (where, first, orderDirection, orderBy) => {
	const query = MULTI_LOAN_QUERY(`{
        loanEntities(${where ? "where: $where," : ""} ${
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

const getLoan = (where) => {
	const query = SINGLE_LOAN_QUERY(`{
        loanEntities(where: $where, first: 1) {
            ${resProps}
        }
    }`);

	const variables = {
		where,
	};

	return { query, variables };
};

const getLoanById = (id) => {
	const query = SINGLE_LOAN_QUERY(`
    {
        loanEntities(where: $where, first: 1) {
            ${resProps}
        }
    }
    `);

	const variables = {
		where: `{ id: ${id} }`,
	};

	return { query, variables };
};

const getLoanByTokenId = (collection, tokenId) => {
	const query = SINGLE_LOAN_QUERY(`
    {
        loanEntities(where: $where, first: 1) {
            ${resProps}
        }
    }`);

	const variables = {
		where: `{ pool_: { id: ${collection} }, token_id: ${tokenId} }`,
	};

	return { query, variables };
};

export {
	getLoans,
	getLoan,
	getLoanById,
	getLoanByTokenId,
	resProps as LoanQueryResProps,
};
