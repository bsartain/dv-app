import { Injectable, ChangeDetectorRef, OnInit } from '@angular/core';
import { CetoDataService, Query__Query, Segment__Header, Query__Group_By, Query__App_Settings } from "../services/ceto-data/ceto-data.service"
import { HeaderDrop, Container } from "./query-page.defs";
import { QueryPageGroupByService } from "./query-page-group-by.service";
import { QueryPageMeasureService } from "./query-page-measure.service";
import { QueryPageFilterService } from "./query-page-filter.service";
import { QueryPageDimensionService } from "./query-page-dimension.service";


@Injectable()
export class QueryPageService {

  private _ref: ChangeDetectorRef;

  public theQuery: Query__Query;
  public displayName: string = "";

  public appSettings: Query__App_Settings = new Query__App_Settings();

  public gbSvc: QueryPageGroupByService = new QueryPageGroupByService(this._cetoDataService);
  public msrSvc: QueryPageMeasureService = new QueryPageMeasureService(this._cetoDataService);
  public ftrSvc: QueryPageFilterService = new QueryPageFilterService(this._cetoDataService, this);
  public dimSvc: QueryPageDimensionService = new QueryPageDimensionService(this._cetoDataService);

  public pendingBackToDash: boolean = false;
  
  constructor(
    private _cetoDataService: CetoDataService,
  ) 
  {
    this._cetoDataService.query.Get_App_Settings().subscribe(
      (data) => {
        this.appSettings = data[0];
      }
    )
  }

  assignQuery(_theQuery:Query__Query) {
    this.theQuery = _theQuery;

    // These should probably just access our query object
    this.gbSvc.assignQuery(_theQuery);
    this.msrSvc.assignQuery(_theQuery);
    this.ftrSvc.assignQuery(_theQuery);
    this.dimSvc.assignQuery(_theQuery);

    this.displayName = this.theQuery.txt_Query_Name;
    
    if (this.displayName == null || this.displayName == "") {
      this.displayName = "<No Name>";
    }
    if (this.theQuery.txt_Query_Status_Name == "New") {
      this.displayName = "New Query"
    }

    //console.log("scott:  assign query: " + this.displayName)
    // if (this._ref != null) {
    //   this._ref.detectChanges();
    // }
  }
  
  // Use this ref to force refresh of components as needed
  registerChangeDetector(_ref: ChangeDetectorRef) {
    this._ref = _ref;
    this.gbSvc.registerChangeDetector(_ref)
    this.msrSvc.registerChangeDetector(_ref)
    this.ftrSvc.registerChangeDetector(_ref)
    this.dimSvc.registerChangeDetector(_ref)
  }

}
