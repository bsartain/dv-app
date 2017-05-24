import { Injectable, ChangeDetectorRef } from '@angular/core';
import { CetoDataService, Query__Query, Segment__Header, Query__Group_By, Query__Filter_Value } from "../services/ceto-data/ceto-data.service"
import { HeaderDrop, Container } from "./query-page.defs";
import { Medusa__Measure, Query__Filter, Query__Header_Count } from "../services/ceto-data/ceto-data.service"
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap/popover/popover';
import { QueryPageService } from "./query-page.service"

declare var jQuery: any;

export class Filter {
  id_Query_Filter_ID: number
  id_Header_ID: number
  txt_Header_Name: string
  int_Order: number

  fvA: Query__Filter_Value[] = [];
  fvSearchA: Query__Filter_Value[] = [];
  fvSelectedH: { [id_Header_Value_ID: number] : boolean } = {};
  allChecked:boolean = false;

  constructor(qf:Query__Filter) {
    this.id_Query_Filter_ID = qf.id_Query_Filter_ID
    this.id_Header_ID = qf.id_Header_ID;
    this.txt_Header_Name = qf.txt_Header_Name
    this.int_Order = qf.int_Order
  }
}

export class ObjectType {
  constructor (public id_Object_Type_ID: number,  public txt_Object_Type_Name: string){}
  public filterC: Container<Filter> = new Container<Filter>("id_Header_ID");
}

export class HeaderPopover {
  id_Header_ID: number
  popover: NgbPopover
}

//@Injectable()
export class QueryPageFilterService {

  private _ref: ChangeDetectorRef;
  private _theQuery: Query__Query;

  public objectTypeC: Container<ObjectType> = new Container<ObjectType>("id_Object_Type_ID");
  public popoverC: Container<HeaderPopover> = new Container<HeaderPopover> ("id_Header_ID")

  constructor(
    private _cetoDataService: CetoDataService,
    private _qpSvc: QueryPageService
  )
  {
  }

  assignQuery(theQuery:Query__Query) {
    this._theQuery = theQuery;
    this.objectTypeC.clear()

    this._cetoDataService.query.Get_Filter(this._theQuery.id_Query_ID).subscribe(
      (data) => {
        let fA:Query__Filter[] = data;
        fA.forEach(f => {
          this.addFilter(f)
        })
      });
  }

  private getObjectType (otid: number, otname: string){
    let ot = this.objectTypeC.find(otid)
    if (ot == null) {
      ot = new ObjectType(otid, otname);
      this.objectTypeC.push(ot);
    }
    return ot;
  }

  private addFilter(qf: Query__Filter){
    let ot = this.getObjectType(qf.id_Object_Type_ID, qf.txt_Object_Type_Name)
    let ftr: Filter = new Filter(qf);
    ot.filterC.push(ftr)
    this._ref.detectChanges();
    this.loadFilter(ftr);
  }

  private loadFilter(ftr: Filter){
    let qfid = ftr.id_Query_Filter_ID;
    ftr.fvA = [];
    this._cetoDataService.query.Get_Filter_Value(qfid).subscribe(
      (data) => {
        let fvA: Query__Filter_Value[] = data;
        ftr.fvA = fvA;
        for(let i = 0; i < fvA.length; i++){
          // The hid is coming back as a string array.  We speculate it's because the value is
          // too large for a JSON number.  As a string, it causes odd behaviour, so the following
          // casts it back to a number.
          let hid:number;
          if (Object.prototype.toString.call(fvA[i].id_Header_Value_ID) === '[object Array]') {
            hid = +(fvA[i].id_Header_Value_ID[0])
          } else {
            hid = fvA[i].id_Header_Value_ID
          }
          fvA[i].id_Header_Value_ID = hid
          ftr.fvSelectedH[fvA[i].id_Header_Value_ID] = false;
//         console.log("scott: loadFilter: " + hid + "|" + fvA[i].id_Header_Value_ID)
        }
        this._cetoDataService.query.Get_Filter_Value_Select(qfid).subscribe(
          (data) => {
            let fvSelectA: Query__Filter_Value[] = data;
            for(let i = 0; i < fvSelectA.length; i++){
              let hid:number;
              if (Object.prototype.toString.call(fvSelectA[i].id_Header_Value_ID) === '[object Array]') {
                hid = +(fvSelectA[i].id_Header_Value_ID[0])
              } else {
                hid = fvSelectA[i].id_Header_Value_ID
              }
              fvSelectA[i].id_Header_Value_ID = hid
              ftr.fvSelectedH[hid] = true;
//              console.log("scott: select: " + hid + "|" + fvA[i].id_Header_Value_ID)
            }
          }
        );
      }
    );
  }

  // Use this ref to force refresh of components as needed
  registerChangeDetector(_ref: ChangeDetectorRef) {
    this._ref = _ref;
  }

  private postSave (ot:ObjectType) {
    this._qpSvc.dimSvc.getHeaderCount(ot.id_Object_Type_ID);
    ot.filterC.array().forEach(ftr => {
        this.loadFilter(ftr);
    })
    this._ref.detectChanges();
  }

  // Save recursively so we know they are all saved before our post-save operations
  private saveFilterValue (selectedA: Query__Filter_Value[], i, ot: ObjectType, qfid: number){
    if (i == selectedA.length) {
      this.postSave(ot);
    }
    else {
      let fv = selectedA[i];
      this._cetoDataService.query.Post_Filter_Value_Select(qfid, fv.id_Header_Value_ID).subscribe(data=>{
        this.saveFilterValue(selectedA, i + 1, ot, qfid);
      });
    }
  }

  public saveFilterValues(otid: number, hid: number) {
    let ot: ObjectType = this.objectTypeC.find(otid);
    let ftr = ot.filterC.find(hid)
    let qfid = ftr.id_Query_Filter_ID;
    this._cetoDataService.query.Delete_Query_Filter_Value_All(qfid).subscribe(
      data => {
        let fvA: Query__Filter_Value[] = ftr.fvA;
        let selectedA: Query__Filter_Value[] = [];
        fvA.forEach( fv => {
          let selected = ftr.fvSelectedH[fv.id_Header_Value_ID];
          if (selected) {
            selectedA.push(fv);
          }
        });
        this.saveFilterValue(selectedA, 0, ot, qfid);
      });
  }

  public onDropHeader($event) {
    if ($event) {
      let hdr: HeaderDrop = $event.dragData[0];
      let ot = this.getObjectType(hdr.id_Object_Type_ID, hdr.txt_Object_Type_Name);
      if (ot.filterC.find(hdr.id_Header_ID) == null) {
        this._cetoDataService.query.Post_Filter(this._theQuery.id_Query_ID, hdr.id_Header_ID, ot.filterC.array().length+1)
          .subscribe(data => {
            let ftr: Query__Filter = data[0];
            this.addFilter(ftr)
          });
      } 
    }
    
  }

  private removeAllFilter (ftrA: Filter[], i, otid: number){
    if (i == ftrA.length) {
      this._qpSvc.dimSvc.getHeaderCount(otid);
    }
    else {
      let ftr: Filter = ftrA[i];
      this._cetoDataService.query.Delete_Filter(ftr.id_Query_Filter_ID).subscribe(data => {
        this.removeAllFilter(ftrA, i + 1, otid);
      });
    }
  }

  removeObjectType(otid: number) {
    let ot = this.objectTypeC.find(otid);
    var filterA = ot.filterC.array().slice();
    var otid: number = ot.id_Object_Type_ID;
    this.objectTypeC.remove(otid);
    this.removeAllFilter(filterA, 0, otid);
  }

  removeFilter(otid: number, hid: number) {
    let ot = this.objectTypeC.find(otid);
    if (ot != null){
      let ftr: Filter = ot.filterC.remove(hid);
      this._cetoDataService.query.Delete_Filter(ftr.id_Query_Filter_ID).subscribe(data => {
        this.postSave(ot);
      });

      // Fix order
      let fA: Filter[] = ot.filterC.array();
      for (let i = 0; i < fA.length; i++){
        let order = i + 1;
        let f: Filter = fA[i];
        if (f.int_Order != order) {
          f.int_Order = order;
          this._cetoDataService.query.Put_Filter_Order(f.id_Query_Filter_ID, order).subscribe(data => {});
        }
      }

      if (ot.filterC.array().length == 0) {
        this.removeObjectType(otid);
      }
    }
    this._ref.detectChanges();
  }

}
