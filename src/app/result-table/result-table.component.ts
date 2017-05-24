import { Component, OnInit, Input, Output } from '@angular/core';
import { QueryDataOldService} from '../services/query-data-old.service';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {
    @Input() public sharedVar: string;
    @Input() public sGroupBy: Array<string>=[];
    @Input() public sHeader: Array<string>=[];
    @Input() public CrossTabe: Array<any>=[];
    @Input() public Measures: Array<any>=[];
    @Input() public Filter: Array<any>=[];

    // table: HTMLTableElement = <HTMLTableElement> document.getElementById("myTable"); 
    // private thead: HTMLElement = <HTMLElement> this.table.createTHead();
    // private tbody: HTMLElement = <HTMLElement> this.table.createTBody();


  constructor(private _QueryDataOldService: QueryDataOldService) { 
    
  }

  ngOnInit() {
    // var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myTable"); 
    // var thead: HTMLElement = <HTMLElement> table.createTHead();
    // var tbody: HTMLElement = <HTMLElement> table.createTBody();
    // var hrow = thead.insertRow(0)
    // var cell = hrow.insertCell(0);
    // cell.innerHTML = "<b>This is a table header</b>";
  }
  
  getResult(){
    this.sGroupBy.push(this.sharedVar);
    console.log(this.sGroupBy);
      //console.log(this.GroupBy2);
     // alert(this.sharedVar);
   }

  
  
 // getStoreData(){
  // this._QueryDataOldService.fetchData()
  //   .subscribe(
  //       data => this.stores =  data, //JSON.stringify(data)
  //       error => this.errorMessage = "itemType data issue.",//<any>error, // alert("Json issue"),
  //       () => console.log("Finished itemType Load")
  //     ) 
   // }
}
