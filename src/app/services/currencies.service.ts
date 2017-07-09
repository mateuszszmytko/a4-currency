import { Injectable } from '@angular/core';

import { Http, Response }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

import { Currency } from '../classes/currency';

import { FixerApi } from '../interfaces/fixerapi.interface';

@Injectable()
export class CurrenciesService {
  private _currencies: BehaviorSubject<Array<Currency>> = new BehaviorSubject([]);
  public readonly currencies: Observable<Array<Currency>> = this._currencies.asObservable();

  constructor(private http:Http) { 
    this.onInit();
  }

  public async onInit() {
    //load currencies from json
    let currs:Array<Currency> = [],
        jsonCurrs = await this.http.get('assets/currencies.json')
            .toPromise()
            .then(r => r.json());

    
    for(let currency of jsonCurrs) {
      try {
        const latest:FixerApi = await this.getFromApi(currency.code),
              history:FixerApi = await this.getFromApi(currency.code, true);

        currs.push(new Currency(currency, latest, history));
      } catch(e) {
        throw new Error(e.message);
      }

    }

    this._currencies.next(currs);
  }

  

  //helpers
  private formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  private async getFromApi(code:string, history?:boolean) {
    let url = `https://api.fixer.io/latest?base=${code}`;
    if(history === true) {
      let historyDateString = this.formatDate(new Date((new Date()).valueOf() - 1000*60*60*24*7));
      url = `https://api.fixer.io/${historyDateString}?base=${code}`;
    }

    
    return this.http.get(url)
                    .toPromise()
                    .then(r => r.json())
                    .catch(error => Promise.reject(error.message ? error.message : error.toString()));
  }

  
}
