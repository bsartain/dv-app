import { Injectable, ChangeDetectorRef } from '@angular/core';
import { CetoDataService, Query__Query, Segment__Header, Query__Group_By } from "../services/ceto-data/ceto-data.service"
import { HeaderDrop, Container } from "./query-page.defs";

//@Injectable()
export class QueryPageGroupByService {

  private _ref: ChangeDetectorRef;

  private _theQuery: Query__Query;

  public groupByC: Container<HeaderDrop> = new Container<HeaderDrop>("id_Header_ID");
  public crossTabC: Container<HeaderDrop> = new Container<HeaderDrop>("id_Header_ID");

  constructor(
    private _cetoDataService: CetoDataService,
  ) 
  {
  }

  assignQuery(theQuery:Query__Query) {
    this._theQuery = theQuery;
    this.groupByC.clear();
    this.crossTabC.clear();

    // Load GB
    this._cetoDataService.query.Get_Group_By(this._theQuery.id_Query_ID).subscribe(
      (data) => {
        let gbA:Query__Group_By[] = data;
        gbA.forEach(gb => {
          if (gb.bool_Cross_Tab == true) {
            this.crossTabC.push(gb)
          }
          else {
            this.groupByC.push(gb)
          }
        })
      })
  }
  
  // Use this ref to force refresh of components as needed
  registerChangeDetector(_ref: ChangeDetectorRef) {
    this._ref = _ref;
  }

  private toSQL() {
    this._cetoDataService.query.Delete_Group_By(this._theQuery.id_Query_ID)
      .subscribe(data => {
        let order = 1;
        this.groupByC.array().forEach(hdr => {
          this._cetoDataService.query.Post_Group_By(this._theQuery.id_Query_ID, hdr.id_Header_ID, 0, order)
            .subscribe(data => {});
          order++;
        })
        this.crossTabC.array().forEach(hdr => {
          this._cetoDataService.query.Post_Group_By(this._theQuery.id_Query_ID, hdr.id_Header_ID, 1, order)
            .subscribe(data => {});
          order++;
        })
      });
  
    // Make sure the screen is correctly refreshed
    this._ref.detectChanges();
  }

  public addCrossTab(hdr:HeaderDrop){
    this.addHeader(hdr, this.crossTabC, this.groupByC);
  }

  public removeCrossTab(id_Header_ID:number){
    this.crossTabC.remove(id_Header_ID)
    this.toSQL();
  }

  public addGroupBy(hdr:HeaderDrop){
    this.addHeader(hdr, this.groupByC, this.crossTabC);
  }

  public removeGroupBy(id_Header_ID:number){
    this.groupByC.remove(id_Header_ID)
    this.toSQL();
  }

  // Manage drops to either Crosstab or GroupBy
  private addHeader(hdr:HeaderDrop, first:Container<HeaderDrop>, second:Container<HeaderDrop>){
    // Add to end of crosstab (need to be able to reorder someday)
    let newA: HeaderDrop[] = [];
    if (first.find(hdr.id_Header_ID) == null) {
      let hdrA: HeaderDrop[] = [hdr];
      // Are there any hdrs of this type in groupBy?  If so, pull them over
      let otid = hdr.id_Object_Type_ID;
      let copySecondA = second.array().slice();
      copySecondA.forEach((_hdr) => {
        if (_hdr.id_Object_Type_ID == otid) {
          second.remove (_hdr.id_Header_ID);
          if (_hdr.id_Header_ID != hdr.id_Header_ID) {
            hdrA.push(_hdr)
          }
        }
      });
      hdrA.forEach((_hdr) => {
        first.push(_hdr);
      })
      this.toSQL();
    } else {
      // console.log("existing");
    }
  }
}
