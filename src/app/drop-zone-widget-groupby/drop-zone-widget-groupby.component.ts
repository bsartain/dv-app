import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderDrop, Container } from "../query-page/query-page.defs";
import { QueryPageService } from "../query-page/query-page.service"
import { Query__Query, Segment__Header } from "../services/ceto-data/ceto-data.service"


@Component({
  selector: 'app-drop-zone-widget-groupby',
  templateUrl: './drop-zone-widget-groupby.component.html',
  styleUrls: ['./drop-zone-widget-groupby.component.css'],
})
export class DropZoneWidgetGroupbyComponent implements OnInit {
 @Input() public headerName: string;
 @Input() public widthInput: string;
 @Input() public heightInput: string;
 @Output() public  receivedData: Array<any> = [];
 @Output() public notify: EventEmitter<string> = new EventEmitter<string>();

 private byeli: any;

  // From QueryPageService
  private theQuery: Query__Query;
  private _displayGroupByA: HeaderDrop[] = [];
  //private _displayGroupByA: HeaderDrop[] = this._queryPageService.gbSvc.groupByC.array();

  constructor(
    private _queryPageService: QueryPageService,
  ) {
  }

  ngOnInit() {
    this._displayGroupByA = this._queryPageService.gbSvc.groupByC.array();
  }

  // ngDestroy() {
  //   this._queryPageService.gbSvc.groupByC.clear();
  // }

  // Push data into receivedData array.
  transferDataSuccess($event) {
    if ($event) {
      let hdr:Segment__Header = $event.dragData[0];
      this._queryPageService.gbSvc.addGroupBy(hdr);
    }
  }

  onClickRemove($event) {
    console.log("gb:onClickRemove")
    let hid = $event.target.id;

    this._queryPageService.gbSvc.removeGroupBy(hid);
  }

}
