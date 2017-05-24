import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedquery'
})
export class SharedqueryPipe implements PipeTransform {
  
 transform(value: any[], filter: string): any[] { 

      filter = filter ? filter.toLocaleLowerCase() : '';

      return filter && value ?
        value.filter(dashval =>
            (dashval.txt_Query_Name !== null ? dashval.txt_Query_Name.toLocaleLowerCase().indexOf(filter) !== -1 : false) ||
            (dashval.txt_User_Name !== null ? dashval.txt_User_Name.toLocaleLowerCase().indexOf(filter) !== -1 : false) ||
            (dashval.dt_Last_Edit !== null ? dashval.dt_Last_Edit.toLocaleLowerCase().indexOf(filter) !== -1 : false)       
        ) :
        value;

   }
}



