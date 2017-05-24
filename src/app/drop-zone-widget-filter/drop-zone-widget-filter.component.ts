import { Component, OnInit } from '@angular/core';
import { QueryPageService } from "../query-page/query-page.service"
import { HeaderDrop, Container } from "../query-page/query-page.defs";
import { ObjectType } from "../query-page/query-page-filter.service"

declare var jQuery:any;

@Component({
  selector: 'app-drop-zone-widget-filter',
  templateUrl: './drop-zone-widget-filter.component.html',
  styleUrls: ['./drop-zone-widget-filter.component.css']
})
export class DropZoneWidgetFilterComponent implements OnInit {

  //private _objectTypeA: ObjectType[] = [];
  
  constructor(private _qpSvc: QueryPageService,) { }
  ngOnInit() {
    //this._objectTypeA = this._qpSvc.ftrSvc.objectTypeC.array();
  }

  public wait: any;

  onDropSuccess($event) {
    let hdr: HeaderDrop = $event.dragData[0];
    let cnt = this._qpSvc.dimSvc.hid2CountH[hdr.id_Header_ID]
    let maxCnt = this._qpSvc.appSettings.int_Max_Header_Values;
    if ($event) {
      if (cnt > maxCnt) {
        alert ("There are too many header values to add " + hdr.txt_Header_Name + ". " + cnt + " > " + maxCnt)
        return;
      }
      else {

        let test = this._qpSvc.ftrSvc.onDropHeader($event);
        let headerId = $event.dragData[0]['id_Header_ID'];
        // setTimeout(function($event){
        //   test;
        //   headerId;
        //   jQuery('.dropElements-' + headerId).find('.glyphicon-pencil').trigger('click');
        // }, 800);
      } 
    } 
      
  }
}
