import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashboard'
})
export class DashboardPipe implements PipeTransform {

  transform(value: any[], filter: string): any[] { 

      filter = filter ? filter.toLocaleLowerCase() : '';

      return filter && value ?

        value.filter(dashval =>
           (dashval.txt_Query_Name !== null ? dashval.txt_Query_Name.toLocaleLowerCase().indexOf(filter) !== -1 : false) ||
           (dashval.txt_Query_Status_Name !== null ? dashval.txt_Query_Status_Name.toLocaleLowerCase().indexOf(filter) !== -1 : false) ||
           (dashval.dt_Last_Run !== null ? dashval.dt_Last_Run.toLocaleLowerCase().indexOf(filter) !== -1 : false) ||
           (dashval.dt_Schedule_Report !== null ? dashval.dt_Schedule_Report.toLocaleLowerCase().indexOf(filter) !== -1 : false)   
        ) :
        
        value;

   }

}



