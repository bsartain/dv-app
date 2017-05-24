import { Pipe, PipeTransform } from '@angular/core';
import { Query__Filter_Value } from "../services/ceto-data/ceto-data.service"
import { Filter } from "../query-page/query-page-filter.service"
@Pipe({
  name: 'filterArray'
})
export class FilterArrayPipe implements PipeTransform {

  transform(valueA: Query__Filter_Value[], term: string, ftr: Filter): any {
    let retA;
    if(term === undefined) {
      retA = valueA;
    } else {
      let query = term.toLowerCase();
      retA = valueA.filter(task =>
        task.txt_Header_Value.toLowerCase().indexOf(query) > -1 
      );
    }
    ftr.fvSearchA = retA;  
    return retA;
  }
}
