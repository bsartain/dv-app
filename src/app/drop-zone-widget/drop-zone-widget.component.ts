import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { QueryPageService } from "../query-page/query-page.service"
import { Query__Query, Segment__Header } from "../services/ceto-data/ceto-data.service"
import { HeaderDrop, Container } from "../query-page/query-page.defs";

@Component({
  selector: 'app-drop-zone-widget',
  templateUrl: './drop-zone-widget.component.html',
  styleUrls: ['./drop-zone-widget.component.css']
})
export class DropZoneWidgetComponent implements OnInit {
  @Input() public headerName: string;
  @Input() public widthInput: string;
  @Output() public  receivedDataCrossTab: Array<any> = [];

  // From QueryPageService
  private theQuery: Query__Query;
  
  //private _displayCrossTabA: HeaderDrop[] = [];

  constructor(
    private _queryPageService: QueryPageService,
  ) {
  }

  ngOnInit() {
    //this._displayCrossTabA = this._queryPageService.gbSvc.crossTabC.array();
  }

  // Push data into receivedDataCrossTab array.
  transferDataSuccess($event) {
    if ($event) {
      let hdr:Segment__Header = $event.dragData[0];
      this._queryPageService.gbSvc.addCrossTab(hdr);
    }
  }

  onClickRemove($event) {
    let hid = $event.target.id;
    this._queryPageService.gbSvc.removeCrossTab(hid);
  }
}
