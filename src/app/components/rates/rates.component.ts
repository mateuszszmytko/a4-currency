import { Component, OnInit, Input } from '@angular/core';

import { Currency } from '../../classes/currency';

import { CurrenciesService } from '../../services/currencies.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit {


    private _currencies:Array<Currency> = [];
    public get currencies():Array<Currency> {
      return this._currencies.filter(c => c !== this.selectedCurrency);
    }
    @Input() selectedCurrency:Currency;
    constructor(private _currenciesService:CurrenciesService) { 

    }

    ngOnInit() {
        this._currenciesService.currencies.subscribe(q => {
            this._currencies = q;
            console.log(this.selectedCurrency);
        });

    }

}