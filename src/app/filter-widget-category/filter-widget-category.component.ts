import { Component, OnInit, Input, Output, OnDestroy, ChangeDetectorRef, ApplicationRef, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QueryDataOldService, HeaderData } from '../services/query-data-old.service';
//import { FilterArrayPipe } from '../filters/filter-array.pipe';
import { QueryPageService } from "../query-page/query-page.service"
import { Filter } from "../query-page/query-page-filter.service"
import { ObjectType, HeaderPopover } from "../query-page/query-page-filter.service"
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap/popover/popover';
import { Query__Filter_Value } from "../services/ceto-data/ceto-data.service"

@Component({
  selector: 'app-filter-widget-category',
  templateUrl: './filter-widget-category.component.html',
  styleUrls: ['./filter-widget-category.component.css'],
})
export class FilterWidgetCategoryComponent implements OnInit {

  @Input() public objectTypeName: string;
  @Input() public objectTypeID: number;
  @Input() public ftr: Filter;

  private _showSave1 = true;
  private _showSave2 = false;
  private _allCheck = false;

  constructor(
    private _qpSvc: QueryPageService,
    private _element: ElementRef,
    private zone:NgZone
  ) { 
  }

  ngOnInit() {
  }

  private _popover: HeaderPopover;
  popoverClick(p:NgbPopover, hid: number) {
    let pp = new HeaderPopover();
    this._popover = pp;
    pp.id_Header_ID = hid;
    pp.popover = p;
    this._qpSvc.ftrSvc.popoverC.push(pp)
    this._qpSvc.ftrSvc.popoverC.array().forEach(pop => {
      if (pop.id_Header_ID != pp.id_Header_ID) {
        pop.popover.close();
      }
    })
  }

  popoverShown($event){
    //console.log("popoverShown")
    this.zone.run(() => {
    });
  }

  popoverHidden($event){
    //console.log("popoverHidden")
  }

  onChangeCheckbox1(ftr: Filter, fv:Query__Filter_Value) {
    let curr = ftr.fvSelectedH[fv.id_Header_Value_ID];
    ftr.fvSelectedH[fv.id_Header_Value_ID] = !curr;
  }

 
  checkAll(ftr: Filter){ 
    ftr.allChecked = !ftr.allChecked;
    ftr.fvA.forEach(
      fv => {
        ftr.fvSelectedH[fv.id_Header_Value_ID] = false;
      }
    )
    ftr.fvSearchA.forEach(
      fv => {
        ftr.fvSelectedH[fv.id_Header_Value_ID] = ftr.allChecked;
      }
    )
  }

  onSave1(hid:number) {
    this._qpSvc.ftrSvc.saveFilterValues(this.objectTypeID, hid);
    this._popover.popover.close();
  }

  removeObjectType($event) {
    this._qpSvc.ftrSvc.removeObjectType(this.objectTypeID)
  }

  removeHeader($event, hid:number) {
    this._qpSvc.ftrSvc.removeFilter(this.objectTypeID, hid)
  }

}
