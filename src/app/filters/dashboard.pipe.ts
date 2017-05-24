import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashboard'
})
export class DashboardPipe implements PipeTransform {
  
 transform(value: any, filter: string): any { 

      filter = filter ? filter.toLocaleLowerCase() : '';

      return filter && value ?
        value.filter(dashval =>
           (dashval.txt_Query_Status.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (dashval.txt_Query_Name.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (dashval.dt_Last_Run.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (dashval.dt_Schedule_Report.toLocaleLowerCase().indexOf(filter) !== -1)           
        ) :
        value;

   }
}


// (dashval.txt_Shared_Query_Name.toLocaleLowerCase().indexOf(filter) !== -1) ||
// (dashval.txt_Author_Name.toLocaleLowerCase().indexOf(filter) !== -1) ||
// (dashval.dt_Shared_Date.toLocaleLowerCase().indexOf(filter) !== -1)
