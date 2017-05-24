"use strict"
import { Component, OnInit, Input, ElementRef, ViewChild, Renderer, HostListener, EventEmitter, Output, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap/popover/popover';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
//import { CetoService } from '../services/ceto.service';
import { FilterPipe } from '../filters/filter.pipe';
import { QueryDataOldService, HeaderData, queryData } from '../services/query-data-old.service';
import { FilterArrayPipe } from '../filters/filter-array.pipe';
import { Query_Filter_ID } from '../services/queryparameters';
import { Dzfilter_request, Dzfilter_response, DzHaederValue_post } from '../class/dzfilter.class' //New Dzfilter class
import { QueryPageService } from "../query-page/query-page.service"

declare var jQuery: any;

@Component({
  selector: 'app-filters',
  templateUrl: './dzfilters.component.html',
  styleUrls: ['./dzfilters.component.css'],
  providers: [queryData, DzHaederValue_post, Query_Filter_ID, Dzfilter_request, Dzfilter_response]
})

export class DzfiltersComponent implements OnInit {
  //@Input() public theQuery: ;
  @Input() public headerName: string;
  @Output() public notify: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('myInput') input: ElementRef;
  @ViewChild('closeTemp') closeTemp: ElementRef;

  private queryData: Object; //Array<any> = [];
  private HeaderValues: Array<any> = [];
  private deleteHeaderValue: Array<Object> = []
  private saveHaderValues: Array<any> = [];
  private array1: Array<Dzfilter_response> = [];
  private array2: Array<Dzfilter_response> = [];
  private array3: Array<Dzfilter_response> = [];
  private array4: Array<Dzfilter_response> = [];
  private array5: Array<Dzfilter_response> = [];
  private array6: Array<Dzfilter_response> = [];
  private array7: Array<Dzfilter_response> = [];
  private query_Filter_ID: Array<any> = []


  constructor(
    private _qpSvc: QueryPageService,
    private _queryDataService: QueryDataOldService,
    private _http: Http,
    private _renderer: Renderer,
    private _queryData: queryData, //Look at removing
    private _query_Filter_ID: Query_Filter_ID, //Look at removing
    private _dzfilter_request: Dzfilter_request,
    private _dzfilter_response: Dzfilter_response, 
    private _dzHaederValue_post: DzHaederValue_post,
    private _elRef: ElementRef, 
  ) {}

  //constructor(private _QueryDataOldService: QueryDataOldService, private _http: Http, private _renderer: Renderer) { }

  ngOnInit() {
    let _query_Filter_ID = new Query_Filter_ID();
    
    jQuery(window).bind("click change load mousemove", function() {
      
    });

    //Brett testing init data 
    // this._http.get(`http://octopus:9000/api/Query/Filter/Value/bxs/513`).map(
    //   (res) => res.json(),
    // ).subscribe(data => this.records = data);

    //private _dzfilter_response: Dzfilter_response,
    //private _dzHaederValue_post: DzHaederValue_post,
    //private _ref: ChangeDetectorRef,

  //) { }
   
  }

  // Push data into receivedData array.
  transferDataSuccess($event) {
    console.log("transferDataSuccess: " + JSON.stringify($event))
    if ($event) {
      this._dzfilter_request.user = this._queryData.txt_User_Name;
      this._dzfilter_request.header_id = $event.dragData[0]["id_Header_ID"];
      this._dzfilter_request.query_id = this._queryData.id_Query_ID;
      this._dzfilter_request.order = this.setArrayName($event.dragData[0]["txt_Object_Type_Name"]); //Get array length for location of last itme droped.
      this._dzfilter_request.txt_Object_Type_Name = $event.dragData[0]["txt_Object_Type_Name"];
      // console.log($event.dragData[0]["id_Header_ID"]);
      // console.log($event.dragData[0]["txt_Object_Type_Name"]);
      console.log(JSON.stringify(this._dzfilter_request))
      this.onDrop();
      //this._ref.detectChanges();
      console.log(this.array2.length)
    }
  }

  setArrayName(ObjectTypeName: string) {
    //Should create 2 dimens array and push data into array.  On drop loop through array and add or create based on ObjectTypeName.
    let arrayName: Array<any> = []
    switch (ObjectTypeName) {
      case "UPC":
        arrayName = this.array1
        break;
      case "Store":
        arrayName = this.array2;
        break;
      case "Date":
        arrayName = this.array5;
        break;
      default:
    }

    //Set object order in array.
    var intOrder: number;

    if (arrayName.length == 0) {
      intOrder = 1;
    } else {
      intOrder = arrayName.length + 1;
    }

    return intOrder;

  }


  //Pulls back selected query data.
  doQuerIDLookUp(query_id: number, user_id: string) {

    this._http.get(`http://octopus:9000/api/Query/${user_id}/${query_id}`).map(
      (res) => res.json()
    ).toPromise().then((data: Object) => { this._queryData = JSON.parse(JSON.stringify(data)), () => { console.log(this._queryData) } });
  }

  deleteHeaderFilter($event, arrayNameTemp: string, id_Header_ID: number) {
    this._http.delete(`http://octopus:9000/api/Query/Filter/${this._queryData.txt_User_Name}/${$event.target.id}`)
      .map(res => res.json())
      .subscribe(data => { console.log(JSON.stringify(data)) }, error => { console.log(error) })

    let arrayName: Array<any> = []
    switch (arrayNameTemp) {
      case "array1":
        //alert(arrayNameTemp);
        arrayName = this.array1
        break;
      case "array2":
        arrayName = this.array2;
        break;
      case "array5":
        arrayName = this.array5;
        break;
      default:
    }

    var searchTerm = id_Header_ID,
      index = -1;
    for (var i = 0, len = arrayName.length; i < len; i++) {
      if (arrayName[i]["id_Header_ID"] == searchTerm) {
        index = i;
        arrayName.splice(index, 1);
        break;
      }
    }
  }

  getHeaderData = function (headerID: number) {
    this._http.get(`http://octopus:9000/api/Segment/Header/Value/${this._queryData.txt_User_Name}/${headerID}`).map(
      (res) => res.json()
    ).subscribe(
      data => this.HeaderValues = data,
      error => console.error(error),
      () => { }
      )
  }

  onDrop() {
    var dimens: string = this._dzfilter_request.txt_Object_Type_Name;
    console.log(JSON.stringify(this._dzfilter_request))
    switch (dimens.toLowerCase()) {
      case "upc":
        this.checkArrayValue(this.array1, this._dzfilter_request);
        let obj1 = document.getElementById('array1').classList.remove("hideDiv");
        break;
      case "store":
        this.checkArrayValue(this.array2, this._dzfilter_request);
        let obj2 = document.getElementById('array2').classList.remove("hideDiv");
        break;
      case "household":
        this.checkArrayValue(this.array3, this._dzfilter_request);
        let obj3 = document.getElementById('array3').classList.remove("hideDiv");
        break;
      case "card":
        this.checkArrayValue(this.array4, this._dzfilter_request);
        let obj4 = document.getElementById('array4').classList.remove("hideDiv");
        break;
      case "date":
        this.checkArrayValue(this.array5, this._dzfilter_request);
        let obj5 = document.getElementById('array5').classList.remove("hideDiv");
        break;
      case "time":
        this.checkArrayValue(this.array6, this._dzfilter_request);
        let obj6 = document.getElementById('array6').classList.remove("hideDiv");
        break;
      case "trip":
        this.checkArrayValue(this.array7, this._dzfilter_request);
        let obj7 = document.getElementById('array7').classList.remove("hideDiv");
        break;
      default:
    }
  }

  onCloseArray($event) {
    let dimens: string = $event.target.id;
    switch (dimens) {
      case "upc":
        this.array1 = [];
        let obj1 = document.getElementById('array1').classList.add("hideDiv");
        break;
      case "store":
        this.array2 = [];
        let obj2 = document.getElementById('array2').classList.add("hideDiv");
        break;
      case "household":
        this.array3 = [];
        let obj3 = document.getElementById('array3').classList.add("hideDiv");
        break;
      case "card":
        this.array4 = [];
        let obj4 = document.getElementById('array4').classList.add("hideDiv");
        break;
      case "date":
        this.array5 = [];
        let obj5 = document.getElementById('array5').classList.add("hideDiv");
        break;
      case "time":
        this.array6 = [];
        let obj6 = document.getElementById('array6').classList.add("hideDiv");
        break;
      case "trip":
        this.array7 = [];
        let obj7 = document.getElementById('array7').classList.add("hideDiv");
        break;
      default:
    }
  }

  onCloseArrayTemp($event) {
    this._renderer.invokeElementMethod(this.input.nativeElement, 'focus');
  }

  /** Passing drop object in     */
  async postHeaderData() {

  }

  //This call will create a new filter on the filter stack.
  checkArrayValue(arrayName, oHeader: {}) {

    let body = JSON.stringify(oHeader)
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url: string = `http://octopus:9000/api/Query/Filter`

    var isInArray: boolean = false;

    if (typeof arrayName !== 'undefined' && arrayName.length > 0) {
      for (var i = 0, len = arrayName.length; i < len; i++) {
        if (arrayName[i]["id_Header_ID"] == oHeader["header_id"]) {
          isInArray = true;
          break;
        } else {
          isInArray = false
        }
      }
      if (isInArray == false) {
        this._http.post(url, body, { headers: headers }).map((res) => res.json())
          .subscribe(data => { this._dzfilter_response = data },
          error => console.error(error),
          () => { arrayName.push(this._dzfilter_response[0]) })
        console.log(arrayName)
      }
    } else {
      this._http.post(url, body, { headers: headers }).map((res) => res.json())
        .subscribe(data => { this._dzfilter_response = data },
        error => console.error(error),
        () => { arrayName.push(this._dzfilter_response[0]) })
      console.log(arrayName)
    }
  }


  onClickRemove($event, arrayNameTemp: string, data: Object) {
    let arrayName: Array<any> = []
    var array: string = arrayNameTemp;
    switch (array.toLocaleLowerCase()) {
      case "array1":
        arrayName = this.array1
        break;
      case "array2":
        arrayName = this.array2;
        break;
      case "array5":
        arrayName = this.array5;
        break;
      default:
    }

    var searchTerm = $event.target.id,
      index = -1;
    for (var i = 0, len = arrayName.length; i < len; i++) {
      if (arrayName[i]["id_Header_ID"] == searchTerm) {
        index = i;
        arrayName.splice(index, 1);
        break;
      }
    }
  }

  //Header demision header value on click.
  onClickShowSelection(headerID: number, selectedFilterID_Temp: number) {
    console.log(JSON.stringify(this.query_Filter_ID));
    this.query_Filter_ID = [];
    this.HeaderValues = [];
    this._http.get(`http://octopus:9000/api/Segment/Header/Value/${this._queryData.txt_User_Name}/${headerID}`).map(
      (res) => res.json()
    ).toPromise().then(data => this.HeaderValues = data);

    //Issue with gitting the selected filterID
    this.query_Filter_ID.push(selectedFilterID_Temp);
    this._query_Filter_ID.Query_Filter_ID = selectedFilterID_Temp;
  }

  //Get Header saved data for filter object.
  onClickGetSaveValue(selectedFilterID_Temp: number) {

    this.HeaderValues = [];
    this._http.get(`http://octopus:9000/api/Query/Filter/Value/Select/${this._queryData.txt_User_Name}/${selectedFilterID_Temp}`).map(
      (res) => res.json()
    ).toPromise().then(data => this.HeaderValues = data);
  }

  //Push all items that has been check on to array to send to database.
  deleteSave(header: Object) {
    this.deleteHeaderValue.push(header);
  }

  //On delete button click loop through this.deleteHeaderValue array and send all deleted data to database. 
  onClickDeletSelectedCheckBox($event) {
    this.HeaderValues = [];
    let filterObject: Object = {}

    for (var i = 0, len = this.deleteHeaderValue.length; i < len; i++) {
      var headerID = this.deleteHeaderValue[i]["id_Header_Value_ID"];

      this._http.delete(`http://octopus:9000/api/Query/Filter/Value/Select/${this._queryData.txt_User_Name}/${this.query_Filter_ID[0]}/${headerID}`)
        .map(res => res.json()).toPromise().then(data => { console.log(JSON.stringify(data)) }, error => { console.log(error) });
    }

    //When data loop is complete call saved data back from database and show in box.
    this.onClickGetSaveValue(this.deleteHeaderValue[0]["id_Query_Filter_ID"])
  }

  //This code is send data to database on check in header option check box list (Show More click).
  logCheckbox(Header_Value_ID, Header_ID, $event) {
    let filterObject: Object = {}

    //Set up object to do post to database.
    this._dzHaederValue_post.user = this._queryData.txt_User_Name;
    this._dzHaederValue_post.query_filter_id = this.query_Filter_ID[0];
    this._dzHaederValue_post.header_value_id = Header_Value_ID;

    console.log(this._dzHaederValue_post);

    if ($event.target.checked) {
      let body = JSON.stringify(this._dzHaederValue_post)
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let url: string = `http://octopus:9000/api/Query/Filter/Value/Select`

      this._http.post(url, body, { headers: headers }).map((res) => res.json())
        .subscribe(data => { console.log(data) },
        error => console.error(error),
        () => { })
    } else {
      this._http.delete(`http://octopus:9000/api/Query/Filter/Value/Select/${this._queryData.txt_User_Name}/${this.query_Filter_ID[0]}/${Header_Value_ID}`)
        .map(res => res.json()) .subscribe(data => { console.log(data) },
        error => console.error(error),
        () => { })
    };
  }

  //Was trying to close all popup box when click on button. (Not working!)
  onSave($event) {
    this.closeTemp.nativeElement.click();
  }

  //Get header value on drop of header in filter zone or on "Add More" click on filter dropdonw popover.
  onClickShowMore(objHeaderTemp: Object) {

    this.HeaderValues = [];

    console.log(JSON.stringify(objHeaderTemp));
    this._http.get(`http://octopus:9000/api/Query/Filter/Value/${this._queryData.txt_User_Name}/${this.query_Filter_ID[0]}`).map(
      (res) => res.json()
    ).toPromise().then(data => this.HeaderValues = data);
  }

  testFun(){
    if(this.HeaderValues.length < 0){
      this._http.get(`http://octopus:9000/api/Query/Filter/Value/${this._queryData.txt_User_Name}/${this.query_Filter_ID[0]}`).map(
      (res) => res.json(),
    ).toPromise().then(data => this.HeaderValues = data);
    }else{

    }
    console.log("This is the new data - " + JSON.stringify(this.HeaderValues))
    
  }
  

  // PopulateData(){
    
    // this._http.get(`http://octopus:9000/api/Query/Filter/Value/bxs/513`).map(
    //   (res) => res.json(),
    // ).subscribe(data => this.HeaderValues = data);
    
    // jQuery(window).trigger('click', function(){
    //   alert('It was clicked')
    // })    
    
    // console.log("This is the new data - " + JSON.stringify(this.HeaderValues))
  // }






}
