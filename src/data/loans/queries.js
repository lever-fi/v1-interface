export const MULTI_LOAN_QUERY = (propString) => `
query($first: Int, $orderDirection: OrderDirection, $orderBy: LoanEntity_orderBy) ${propString}
`;

export const SINGLE_LOAN_QUERY = (propString) => `
query($where: LoanEntity_filter) ${propString}
`;
