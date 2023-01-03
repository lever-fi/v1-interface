export const MULTI_POOL_QUERY = (propString) => `
query($first: Int, $orderDirection: OrderDirection, $orderBy: PoolEntity_orderBy) ${propString}
`;

export const SINGLE_POOL_QUERY = (propString) => `
query($where: PoolEntity_filter) ${propString}
`;
