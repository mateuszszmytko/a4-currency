import { Component } from '@angular/core';

import { Currency } from './classes/currency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  selectedCurrency:Currency;

  title = 'app';
  constructor() {

  }
  setSelectedCurrency(e) {
    this.selectedCurrency = e;
  }

}
