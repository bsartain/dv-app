import { Injectable, ChangeDetectorRef } from '@angular/core';
import { CetoDataService, Query__Query, Segment__Header, Query__Group_By } from "../services/ceto-data/ceto-data.service"
import { HeaderDrop, Container } from "./query-page.defs";
import { Medusa__Measure } from "../services/ceto-data/ceto-data.service"

//@Injectable()
export class QueryPageMeasureService {

  private _ref: ChangeDetectorRef;

  private _theQuery: Query__Query;

  public measureC: Container<Medusa__Measure> = new Container<Medusa__Measure>("id_Measure_ID");

  constructor(
    private _cetoDataService: CetoDataService,
  ) 
  {
    //console.log("QueryPageService:constructor")
  }

  assignQuery(theQuery:Query__Query) {
    this._theQuery = theQuery;
    this.measureC.clear();

    this._cetoDataService.query.Get_Measure(this._theQuery.id_Query_ID).subscribe(
      (data) => {
        let gbA:Medusa__Measure[] = data;
        gbA.forEach(gb => {
            this.measureC.push(gb)
        });
      });
  }
  
  // Use this ref to force refresh of components as needed
  registerChangeDetector(_ref: ChangeDetectorRef) {
    this._ref = _ref;
  }

  private toSQL() {
    this._cetoDataService.query.Delete_Measure_All(this._theQuery.id_Query_ID)
      .subscribe(data => {
        let order = 1;
        this.measureC.array().forEach(msr => {
          this._cetoDataService.query.Post_Measure(this._theQuery.id_Query_ID, msr.id_Measure_ID, order)
            .subscribe(data => {});
          order++;
        })
      });
  
    // Make sure the screen is correctly refreshed
    this._ref.detectChanges();
  }

  public addMeasure(msr:Medusa__Measure){
    if (this.measureC.find(msr.id_Measure_ID) == null) {
      this.measureC.push(msr);
      this.toSQL();
    }
  }

  public removeMeasure(id_Measure_ID:number){
    this.measureC.remove(id_Measure_ID);
    this.toSQL();
  }
}
