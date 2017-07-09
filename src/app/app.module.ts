import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ExchangeFormComponent } from './components/exchange-form/exchange-form.component';
import { CurrencyPickerComponent } from './components/currency-picker/currency-picker.component';
import { CurrencyFilterPipe } from './pipes/currency-filter.pipe';

import { CurrenciesService } from './services/currencies.service';

import { RatesComponent } from './components/rates/rates.component';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeFormComponent,
    CurrencyPickerComponent,
    CurrencyFilterPipe,
    RatesComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [CurrenciesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
