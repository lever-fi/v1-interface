import { createClient } from "urql";

import { LEVER_SUBGRAPH_URL } from "constants/urls.js";

const Client = createClient({
	url: LEVER_SUBGRAPH_URL,
});

export default Client;
