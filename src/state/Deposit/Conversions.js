import { makeAutoObservable } from "mobx";

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

	updateConversion({ eth, token }) {
		if (eth) {
			console.log("converting eth");
			this.eth = eth;
			this.token = eth * 100;
			return;
		}

		if (token) {
			console.log("converting token");
			this.token = token;
			this.eth = token / 100;
			return;
		}
	}
}
