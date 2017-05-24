import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { Medusa__Measure } from "../services/ceto-data/ceto-data.service"
import { QueryPageService } from "../query-page/query-page.service"

@Component({
  selector: 'app-drop-zone-widget-measure',
  templateUrl: './drop-zone-widget-measure.component.html',
  styleUrls: ['./drop-zone-widget-measure.component.css']
})
export class DropZoneWidgetMeasureComponent implements OnInit {
  @Input() public headerName: string;
  @Input() public widthInput: string;
  @Output() public  receivedData: Array<any> = [];
  
  private _displayMeasureA: Medusa__Measure[] = [];

  constructor(private _qpSvc: QueryPageService,) {
  }

  ngOnInit() {
    this._displayMeasureA = this._qpSvc.msrSvc.measureC.array();
  }

  // Push data into receivedData array.
  onDropSuccess($event) {
    if ($event) {
      console.log("onDropSuccess: " + JSON.stringify($event))
      this._qpSvc.msrSvc.addMeasure($event.dragData[0])
    }
  }

  onClickRemove($event) {
    let searchTerm = $event.target.id;
    console.log("onclickRemove: " + searchTerm)

    this._qpSvc.msrSvc.removeMeasure($event.target.id)   ;
  }

}
