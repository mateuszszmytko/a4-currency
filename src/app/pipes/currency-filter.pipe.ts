import { Pipe, PipeTransform } from '@angular/core';

import { Currency } from '../classes/currency';

@Pipe({
  name: 'currencyFilter'
})
export class CurrencyFilterPipe implements PipeTransform {

  transform(value: Currency[], args:string):Currency[] {
        let filter = args ? args.toLocaleLowerCase() : null;
        console.log(filter);
        return filter ? value.filter((product:Currency) => product.code.toLocaleLowerCase().indexOf(filter) != -1) 
        : value;
    }

}
