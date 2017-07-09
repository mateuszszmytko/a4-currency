import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Currency } from '../../classes/currency';

import { CurrenciesService } from '../../services/currencies.service';

@Component({
  selector: 'app-currency-picker',
  templateUrl: './currency-picker.component.html',
  styleUrls: ['./currency-picker.component.css'],
  providers: []
})
export class CurrencyPickerComponent implements OnInit {
    pickerActive:boolean = false;
    currFilter:string = '';
    currencies:Array<Currency> = [];
    selectedCurrency:Currency;

    @Output() setCurrency:EventEmitter<Currency> = new EventEmitter<Currency>();
    

    constructor(private _currenciesService:CurrenciesService) {  }

    public ngOnInit():void {
        this._currenciesService.currencies.subscribe(q => {
            this.currencies = q;
            this.updateCurrency(this.currencies[0]);
        });
        

    }

    tooglePicker():void {
        this.pickerActive = !this.pickerActive;
    }

    updateCurrency(curr:Currency) {
        this.selectedCurrency = curr;
        this.setCurrency.emit(this.selectedCurrency);
    }
    


    //events
    setFilter(event:KeyboardEvent):void {
      this.currFilter = (<HTMLInputElement>event.target).value;
    }

    selectCurrency(selectCurrency:Currency) {
        console.log(selectCurrency);
        this.selectedCurrency = selectCurrency;
        this.tooglePicker();
        this.currFilter = '';

        this.setCurrency.emit(this.selectedCurrency);
    }
    

}