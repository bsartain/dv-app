import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any, term?: any): any {
      //Check if search term is undefined
      if(term === undefined) return values;
      // return updated values array
      return values.filter(function(value){
      return value.toLowerCase().includes(term.toLowerCase());
    })    
  }
}
