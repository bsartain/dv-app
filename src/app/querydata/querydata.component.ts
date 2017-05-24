import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropZoneWidgetGroupbyComponent } from '../drop-zone-widget-groupby/drop-zone-widget-groupby.component';
import { Routes, Router, RouterModule, ActivatedRoute, Params, ActivatedRouteSnapshot } from '@angular/router';
import { QueryPageService } from "../query-page/query-page.service";
import { Query__Query } from "../services/ceto-data/ceto-data.service";
import { DimensionsComponent } from "../dimensions/dimensions.component";
import { CetoDataService} from "../services/ceto-data/ceto-data.service";
import { ToasterContainerComponent, ToasterService } from 'angular2-toaster';

declare var jQuery:any;

@Component({
  selector: 'app-querydata',
  templateUrl: './querydata.component.html',
  styleUrls: ['./querydata.component.css'],
  providers: [DropZoneWidgetGroupbyComponent]
})
export class QuerydataComponent implements OnInit {
  private dropZoneFilter = 'FILTERS'; 
  private dropZoneGroupBy = 'GROUP BY';
  private dropZoneMeasures = 'MEASURES';
  private dropZoneCrossTab = 'CROSS TAB';
  private sharedValue: string;

  private _theQuery: Query__Query;
  //private _displayName: string = "";
  private groupBy: string[];
  private numGroupBy: number = 0;
  private measures: string[];
  private numMeasures: number = 0;
  private crossTabs: string[];
  private numCrossTabs: number = 0;
  private headers: string[];
  private tableData: string[][];
  private measuresFirst: boolean = false

  private numHeaders: number = 0;
  private numHeaderRows: number;
  //private previewHeader: string[][] = [];
  private hdrRowAA: string[][] = [];
  private dataRowAA: string[][] = [];

  stores: String[];
  upcs = [];
  bool = null;
  errorMessage: string;

  newItem = {
    EndTime: null,
    StartTime: null
  };
  
  constructor(
    private _ref: ChangeDetectorRef,
    private _qpSvc: QueryPageService,
    private router: Router,
    private _route: ActivatedRoute,
    private _cetoDataService: CetoDataService,
    private toasterService: ToasterService,
    private _router: Router,
    ) { 
      this.router = _router;
      this.groupBy = [];
      this.measures = [];
      this.tableData = [];
      this.crossTabs = [];
  }

  ngOnInit() {
    let theQuery:Query__Query = this._route.snapshot.data['query'][0];
    this._qpSvc.assignQuery(this._route.snapshot.data['query'][0]);
    this._theQuery = this._route.snapshot.data['query'][0];
    this._qpSvc.registerChangeDetector(this._ref);
    this._cetoDataService.query.Get_Is_Modified(this._theQuery.id_Query_ID).subscribe(
      (data) => console.log('MODIFIED STATE ' + JSON.stringify(data))
    )
    this.measuresFirst = theQuery.bool_Measures_First;

    //this.getPreview();
  }

  loadMeasures(kName: string, measures: any[])
  {
    let arr: string[] = [];

    measures.forEach(o => {
      arr.push(o[kName]);
    });
    this.measures = arr;
    this.numMeasures = this.measures.length;
    // console.log("Measures: " + this.measures);
  }

  loadGroupBy(kName: string, headers: any[], data: any[])
  {
    let arr: string[] = [];

    headers.forEach(o => {
      arr.push(o[kName]);
    });

    this.groupBy = arr;
    this.numGroupBy = this.groupBy.length;
    // console.log("Group By Headers: " + this.groupBy);
    
    data.forEach(o => {
      let gd: string[] = [];
      for(var key in o) {
         gd.push(o[key]);
      }
      this.tableData.push(gd);
      // console.log("Group By Values: " + gd);
    });    
  }

  loadCrossTabs(kName: string, crosstabs: any[], data: any[])
  {
    let Headers: string[] = [];

    crosstabs.forEach(o => {
      Headers.push(o[kName]);
    });

    // console.log("Cross Tabs Headers: " + this.crossTabs);
    
    data.forEach(o => {
      let head: string = o[Headers[0]];
      for(var i = 1 ; i < Headers.length ; i++)
      {
        head = head + " - " + o[Headers[i]];
      }
      this.crossTabs.push(head);
      // console.log("Cross Tab header: " + head);
    });
    
    if (this.crossTabs.length > 0)
    {
      this.numHeaderRows = 2;
    }
    else
    {
      this.numHeaderRows = null;
    }
  }

  getPreview() {
    //console.log("scott: " + this._theQuery.id_Query_ID)
    this._cetoDataService.query.Get_Preview(this._theQuery.id_Query_ID).subscribe(
      data => {
        // Group By
        let res1 = data[0]; 
        // Crosstabs/measures
        let res4 = data[3];

        // Create header rows
        let key1 = Object.keys(res1[0])
        this.hdrRowAA = [];

        let key4 = Object.keys(res4[0])
        for (let i = 0 ; i < key4.length ; i++) {
          //let key = key4[i];
          //console.log("scott3a: " + x)
          let hdrRowA: string[] = [];
          for (let j = 0; j < key1.length; j++) {
            if (i == key4.length - 1) {
              hdrRowA.push(key1[j])
            } else {
              hdrRowA.push("")
            }
          }
          this.hdrRowAA.push(hdrRowA)
        }

        // Need to populate the header rows one column at a time
        for (let i = 0 ; i < res4.length; i++) {
          let res = res4[i]
          for (let j = 0 ; j < key4.length; j++) {
            this.hdrRowAA[j].push(res[key4[j]])
          }
        }

        // Populate data rows
        this.dataRowAA = [];
        for (let i = 0 ; i < res1.length; i++) {
          let rowA:string [] = [];
          // Add group by
          for (let j = 0 ; j < key1.length; j++) {
            rowA.push(res1[i][key1[j]])
          }
          for (let j = 0 ; j < res4.length; j++) {
            rowA.push("---")
          }
          this.dataRowAA.push(rowA)
        }

        // jQuery(document).ready(function(){
        //   jQuery('#numGroupBy').attr('colspan', numGroupBys);
        //   jQuery('.numMeasures1').attr('colspan', numGroupBys);
        //   console.log('NUM MEASURES ' + JSON.stringify(this.numMeasures));
        // })

      }
    );
  }

  onNotify(message: string):void{
    this.sharedValue = message;
  }

  backToDash(){
      this._cetoDataService.query.Get_Is_Modified(this._theQuery.id_Query_ID).subscribe(
      (data) => {
        if(data[0]['modified'] == 1){
          jQuery('#backToDashModal').modal('show');
        } else {
          //this._router.navigate(['/dashboard']);
          this.actuallyGoBackToDash();
        }
      }
    )
  }

  backToDashSave(){
      if(this._theQuery.txt_Query_Status_Name == "New"){
        this._qpSvc.pendingBackToDash = true
        jQuery('#saveAsQuery').modal('show');  // This is on a different component!
        jQuery('#backToDashModal').modal('hide');
      }
      else {
      //this._cetoDataService.query.Put_Name(this._theQuery.id_Query_ID, this._theQuery.txt_Query_Name).subscribe(
      //data => {
        this._cetoDataService.query.Put_Save(this._theQuery.id_Query_ID).subscribe(
          (data) => {
              jQuery('#backToDashModal').modal('hide');
              //this._router.navigate(['/dashboard']);    
              this.actuallyGoBackToDash();        
          },
          (err) => this.toasterService.pop('error', 'Your query failed to save'),
        )
      //},
      //(err) => this.toasterService.pop('error', 'Your query failed to save name'),
    //)
      }
  }

  actuallyGoBackToDash(){
      console.log('BACK TO DASH DISCARD');
      this._cetoDataService.query.Put_Edit_Cancel(this._theQuery.id_Query_ID).subscribe(
          (data) => {
              this._router.navigate(['/dashboard']);
          },
          (err) => this.toasterService.pop('error', 'Your query failed to Discard'),
      )
  }

  swapMesauresCrosstab() {
    this.measuresFirst = !this.measuresFirst;
    this._cetoDataService.query.Put_Measures_First(this._theQuery.id_Query_ID, this.measuresFirst).subscribe(
      (data)=>{}
    )
  }
  
}
