import { makeAutoObservable } from "mobx";

import { ethToToken, tokenToEth } from "utils/calcConversion";

export class Calculator {
	eth = 0;
	token = 0;

	constructor() {
		makeAutoObservable(this);
	}

	reset({ eth, token }) {
		this.eth = eth;
		this.token = token;
	}

	updateConversion({ eth, token, params }) {
		if (eth) {
			this.eth = eth;
			this.token = ethToToken(eth, params[0], params[1]);
			return;
		}

		if (token) {
			this.token = token;
			this.eth = tokenToEth(token, params[0], params[1]);
			return;
		}
	}
}
