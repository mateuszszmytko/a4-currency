import { Component, OnInit, Output, EventEmitter} from '@angular/core';

import { Currency } from '../../classes/currency';



@Component({
  selector: 'app-exchange-form',
  templateUrl: './exchange-form.component.html',
  styleUrls: ['./exchange-form.component.css']
})
export class ExchangeFormComponent implements OnInit {
  @Output() selectedCurrency:EventEmitter<Currency> = new EventEmitter<Currency>();

  firstCurrency:Currency = null;
  secondCurrency:Currency = null;

  moneyAmount:number = 0;
  moneyExchanged:number = 0;

  constructor() { }

  ngOnInit() {

  }

  setCurrency(id:number, curr:Currency) {
      id === 1? this.firstCurrency = curr: this.secondCurrency = curr;
      //this.updateExchange();

      this.selectedCurrency.emit(this.firstCurrency);
      this.updateExchangedValue();

  }

  updateExchangedValue() {
    if(this.moneyAmount <= 0) {
      return;
    }
    const rate = this.firstCurrency.getRate(this.secondCurrency.code);
    
    if(!rate) {
      this.moneyExchanged = this.moneyAmount;
      return;
    }  

    this.moneyExchanged = this.moneyAmount * rate;

  }

  //events
  setMoneyAmount(e:KeyboardEvent) {
    this.moneyAmount = parseInt((<HTMLInputElement>e.target).value);
    console.log(this.moneyAmount);

    this.updateExchangedValue();
    
  }

}
