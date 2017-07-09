import { FixerApi } from '../interfaces/fixerapi.interface';
import { CurrencyJson } from '../interfaces/currencyjson.interface';

export class Currency {
	name:string;
	code:string;
	country:string;
	countryCode:string;
	rates:{[key:string]:number}
	history:{[key:string]:number}

	constructor(jsonObj:CurrencyJson, latest:FixerApi, history:FixerApi) { 
		this.name = jsonObj.name;
		this.code = jsonObj.code;
		this.countryCode = jsonObj.countryCode;
		this.rates = latest.rates;
		this.history = history.rates;
	}

	public get url() {
		return 'assets/flags/'+this.countryCode.toLowerCase()+'.svg';
	}

	public getRate(code:string, amount:number = 1):number {
		return (this.rates[code]? this.rates[code]: 1)*amount;
	}
	public getHistoryRate(code:string, amount:number = 1):number {
		return (this.history[code]? this.history[code]: 1)*amount;
	}
	
	public isGrowing(code:string) {
		return this.getRate(code) > this.getHistoryRate(code);
	}
	public isFalling(code:string) {
		return this.getRate(code) < this.getHistoryRate(code);
	}
}
