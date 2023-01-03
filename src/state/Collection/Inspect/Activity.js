import { makeAutoObservable } from "mobx";

export class Activity {
	feed = [];

	constructor() {
		makeAutoObservable(this);
	}

	reset() {
		this.feed = [];
	}

	add(item) {
		this.feed.push(item);
	}

	replace(items) {
		this.feed = items;
	}
}
