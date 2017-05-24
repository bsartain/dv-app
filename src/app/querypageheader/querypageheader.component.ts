import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { QueryDataOldService } from '../services/query-data-old.service';
//import { saveQuery } from '../dashboard/queryparameters';
import { ToasterContainerComponent, ToasterService } from 'angular2-toaster';
import { CetoDataService } from "../services/ceto-data/ceto-data.service"
import { Query__Query } from "../services/ceto-data/ceto-data.service";
import { QueryPageService } from "../query-page/query-page.service";

declare var jQuery: any;

@Component({
  selector: 'app-querypageheader',
  templateUrl: './querypageheader.component.html',
  styleUrls: ['./querypageheader.component.css'],
  //providers: [saveQuery],
})
export class QuerypageheaderComponent implements OnInit {

  private id_Query_ID; // Original query id
  private query: Query__Query;
  queryArray = [];

  newItem = {
    EndTime: null,
    StartTime: null
  };

  constructor(
    private _router:Router,
    private _route: ActivatedRoute,
    //private _save: saveQuery,
    private _queryDataService: QueryDataOldService,
    private _qpSvc: QueryPageService,
    private toasterService: ToasterService,
    private _cetoDataService: CetoDataService,
    ) { }

  ngOnInit() {
    this.query = this._route.snapshot.data['query'][0];
    //console.log('brett ' + this.query.bool_All_Transactions)
    //this.queryArray = this._route.snapshot.data['query'][0];
    //console.log('Query SNAPSHOT ' + JSON.stringify(this.query)) 
    //console.log("scott params: " + this._route.snapshot.params['id_Query_ID'])
    this.id_Query_ID = this._route.snapshot.params['id_Query_ID']
    //route.params['id_Query_ID']
  }

  // backToDashBoard(){
  //   alert("back");
  //   this.router.navigate(["/dashboard"]);
  // }  

  checkExcludeSupplies(){
    this.query.bool_Exclude_Supplies = !this.query.bool_Exclude_Supplies;
    this.callPutOptions();
  }

  checkExcludehh(){
    this.query.bool_Exclude_Exception_HHs = !this.query.bool_Exclude_Exception_HHs;
    this.callPutOptions();
  }

  checkedCardOnly(){
    this.query.bool_Card_Only = true; 
    this.query.bool_All_Transactions = false;
    this.query.bool_Non_Card_Only = false;
    this.callPutOptions()
  }

  checkedAllTransactions(){
    this.query.bool_Card_Only = false; 
    this.query.bool_All_Transactions = true;
    this.query.bool_Non_Card_Only = false;
    this.callPutOptions()
  }

  checkedNonCard(){
    this.query.bool_Card_Only = false; 
    this.query.bool_All_Transactions = false;
    this.query.bool_Non_Card_Only = true;
    this.callPutOptions()
  }

  callPutOptions(){
    this._cetoDataService.query.Put_Options(this.query).subscribe()
  }

  saveQuery(){
    //this._save.user = this.query.txt_User_Name
    //this._save.query_id = this.query.id_Query_ID
    console.log('QUERY STATUS NAME ' + JSON.stringify(this.query.txt_Query_Status_Name))

    if(this.query.txt_Query_Status_Name == "New"){

      jQuery('#saveAsQuery').modal('show');

    } else {

       //this._cetoDataService.query.Put_Name(this.query.id_Query_ID, this.query.txt_Query_Name).subscribe(
      //   data => {

          this._cetoDataService.query.Put_Save(this.query.id_Query_ID).subscribe(
            (data) => {this.toasterService.pop('success', 'Your query was saved'); },
            (err) => this.toasterService.pop('error', 'Your query failed to save'),
          )
        //}
      //   ,
      //   (err) => this.toasterService.pop('error', 'Your query failed to save name'),
      // )

    }
  }

  saveQueryAs(q){
    if(this.query.txt_Query_Status_Name == "New"){
      this._cetoDataService.query.Put_Name_Desc(this.query.id_Query_ID, this.query.txt_Query_Name, this.query.txt_Description).subscribe(
         data => {    
            this._cetoDataService.query.Put_Save(this.query.id_Query_ID).subscribe(
            (data) => {
              this._cetoDataService.query.Get_Query(this.query.id_Query_ID).subscribe(
                (data) => {
                  this.toasterService.pop('success', 'Your query was saved'); 
                  // Was this called from a discard?
                  if (this._qpSvc.pendingBackToDash == true) {
                    this._qpSvc.pendingBackToDash = false;
                    this._cetoDataService.query.Put_Edit_Cancel(this.query.id_Query_ID).subscribe(
                      (data) => {
                        this._router.navigate(['/dashboard']);      
                      },
                      (err) => this.toasterService.pop('error', 'Your query failed to Save As'),
                    )
                  }
                  else {
                    let query: Query__Query = data[0];
                    this.query=query
                    this._qpSvc.assignQuery(this.query)
                  }
                }
              );
            },
            (err) => this.toasterService.pop('error', 'Your query failed to save'),
          )
         }
      )
    }
    else {
      this.query.id_Query_ID = q.id_Query_ID,
      this.query.txt_Query_Name = q.txt_Query_Name,
      this.query.txt_Description = q.txt_Description
      
      this._cetoDataService.query.Post_SaveAs(
        this.query.id_Query_ID,
        this.query.txt_Query_Name,
        this.query.txt_Description
      ).subscribe(
        (data) => this.toasterService.pop('success', 'Your new query was saved'),
        (err) => this.toasterService.pop('error', 'Your new query failed to save'),
        () => console.log('Request complete'),
      )
    }
  }

  saveQueryModel(queryId){


    //Does not work. I need to switch to the save as API
    // console.log('QUERY ID PASSED IN IS ' + JSON.stringify(queryId));
    // this.query.id_Query_ID = queryId;
    // this._cetoDataService.query.Post_SaveAs(this.query.id_Query_ID).subscribe(
    //     (data) => this.toasterService.pop('success', 'Your query was saved'),
    //     (err) => this.toasterService.pop('error', 'Your query failed to save'),
    //     () => console.log('Request complete'),
    // )


    // this._save.user = name,
    // this._save.query_id = description,
    // this._queryDataService.saveQueryMethod(this._save).subscribe(
    //   (data) => this.toasterService.pop('success', 'Your query was saved'),
    //   (err) => this.toasterService.pop('error', 'Your query failed to save'),
    //   () => console.log('Request complete'),
    // )


  }

  saveAndRunFunction(queryId){
    console.log('brett1: ' + JSON.stringify(queryId));
    this._cetoDataService.query.Put_Save(queryId.id_Query_ID).subscribe(
        (data) => {
          this._cetoDataService.query.Get_Run(queryId.id_Query_ID, true).subscribe(
            (data) => {
              this._router.navigate(['/dashboard']);
            }
          )
        }
      )
  }

  runThenSaveThenDash(queryId){
    if(queryId.txt_Query_Status_Name == "New"){
      jQuery('#saveBeforeRun').modal('show')
    } else {
      this.saveAndRunFunction(queryId);
    }    
  }

  saveFromModalThenRun(queryId){
      this.saveAndRunFunction(queryId);
  }

  clearValues(){
    jQuery('input[ng-reflect-model="[object Object]"]').val("")
    jQuery('select[name="schedule"]').prop("selectedIndex", 0);
  }


}
