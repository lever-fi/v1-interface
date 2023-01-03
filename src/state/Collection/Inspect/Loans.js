import { makeAutoObservable } from "mobx";

export class Loans {
	collectionAddress = 0;
	loans = [];
	lastUpdated = 0;

	constructor() {
		makeAutoObservable(this);
	}

	set(collectionAddress) {
		this.collectionAddress = collectionAddress;
		this.retrieve();
	}

	update(loans) {
		this.loans = loans;
		this.lastUpdated = Date.now();
	}
}

export class Loan {
	loan_id = 0;
	token_id = 0;
	principal = 0;
	interest = 0;
	interest_rate = 0;
	ownership = 0;
	next_installment = "0 days";
	schedule = [
		{
			principal: 0,
			interest: 0,
			due: "01/01/1969",
			state: "FAIL",
		},
		{
			principal: 0,
			interest: 0,
			due: "01/01/1969",
			state: "FAIL",
		},
		{
			principal: 0,
			interest: 0,
			due: "01/01/1969",
			state: "FAIL",
		},
		{
			principal: 0,
			interest: 0,
			due: "01/01/1969",
			state: "FAIL",
		},
	];

	constructor() {
		makeAutoObservable(this);
	}

	reset() {
		this.loan_id = 0;
		this.token_id = 0;
		this.principal = 0;
		this.interest = 0;
		this.interest_rate = 0;
		this.ownership = 0;
		this.next_installment = "0 days";
		this.schedule = [
			{
				principal: 0,
				interest: 0,
				due: "01/01/1969",
				state: "FAIL",
			},
			{
				principal: 0,
				interest: 0,
				due: "01/01/1969",
				state: "FAIL",
			},
			{
				principal: 0,
				interest: 0,
				due: "01/01/1969",
				state: "FAIL",
			},
			{
				principal: 0,
				interest: 0,
				due: "01/01/1969",
				state: "FAIL",
			},
		];
	}

	update(_params) {
		this.loan_id = _params.loan_id;
		this.token_id = _params.token_id;
		this.principal = _params.principal;
		this.interest = _params.interest;
		this.interest_rate = _params.interest_rate;
		this.ownership = _params.ownership;
		this.next_installment = _params.next_installment;
		this.schedule = _params.schedule;
	}
}
