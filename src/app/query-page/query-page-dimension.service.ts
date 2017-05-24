import { Injectable, ChangeDetectorRef } from '@angular/core';
import { HeaderDrop, Container } from "./query-page.defs";
import { CetoDataService, Query__Query, Segment__Header, Medusa__Measure, Medusa__Measure_Group, Segment__Object_Type } from '../services/ceto-data/ceto-data.service';

export class Measure_Group
{
  id_Measure_Group_ID: number
  txt_Measure_Group_Name: string
  int_Order: number
  measureA: Medusa__Measure[] = [];

  constructor(mg:Medusa__Measure_Group) {
    this.id_Measure_Group_ID = mg.id_Measure_Group_ID
    this.txt_Measure_Group_Name = mg.txt_Measure_Group_Name
    this.int_Order = mg.int_Order
  }
}

//@Injectable()
export class QueryPageDimensionService {

  private _ref: ChangeDetectorRef;

  private _theQuery: Query__Query;

  public objectTypeC: Container<Segment__Object_Type> = new Container<Segment__Object_Type>("id_Object_Type_ID");

  //public measureGroupA:Medusa__Measure_Group[] = [];
  public measureGroupC:Container<Measure_Group> = new Container<Measure_Group>("id_Measure_Group_ID");
  public measureA:Medusa__Measure[] = [];
  public hdrAA:Segment__Header[][] = [];

  public hid2CountH: { [id_Header_ID: number] : number } = {};

  constructor(
    private _cetoDataService: CetoDataService,
  ) 
  {
  }

  assignQuery(theQuery:Query__Query) {
    this._theQuery = theQuery;
    this._cetoDataService.segment.Get_Object_Type().subscribe(
      (data) => {
        let otA: Segment__Object_Type[] = data;
        otA.forEach(ot => {
          this.objectTypeC.push(ot)
        })
        otA.forEach(ot => {
          this.getHeaderCount(ot.id_Object_Type_ID);
        })
      });
    this._cetoDataService.medusa.Get_Measure_Group().subscribe(
      data => {
        let mgA: Medusa__Measure_Group[] = data;
        this.measureGroupC.clear()
        mgA.forEach(mg => {
          this.measureGroupC.push(new Measure_Group(mg));
        })
        this._cetoDataService.medusa.Get_Measure().subscribe(
          (data) => {
            this.measureA = data;
            let msrA: Medusa__Measure[] = data;
            msrA.forEach(msr => {
              let mg: Measure_Group = this.measureGroupC.find(msr.id_Measure_Group_ID)
              mg.measureA.push(msr)
              //console.log(msr.id_Measure_Group_ID + " " + JSON.stringify(mg))
            })
            this._ref.detectChanges();
            //console.log(JSON.stringify(this.measureA))
          });
      });
  
  }
  
  public getHeaderCount(otid: number) {
    let ot = this.objectTypeC.find(otid);
    this._cetoDataService.query.Get_Header_Count(this._theQuery.id_Query_ID, ot.id_Object_Type_ID).subscribe(
            (hdata) => {
              let hdrA: Segment__Header[] = hdata;
              this.hdrAA[ot.int_Display_Order] = hdrA;
              hdrA.forEach(
                hdr => {
                  this.hid2CountH[hdr.id_Header_ID] = hdr.int_Header_Value_Count;
                }); 
              this._ref.detectChanges();
            });
  }

  // Use this ref to force refresh of components as needed
  registerChangeDetector(_ref: ChangeDetectorRef) {
    this._ref = _ref;
  }

}
