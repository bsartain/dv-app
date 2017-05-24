import { Component, EventEmitter, OnInit, ElementRef, Directive, Input, Output  } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardPipe } from './dashboard.pipe';
import { SharedqueryPipe } from './sharedquery.pipe';
import { NgbModule, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Notes, DeleteQuery, ShareQuery, cancelNote, newQuery } from './queryparameters';
import { ToasterContainerComponent, ToasterService } from 'angular2-toaster';
import { FormsModule } from '@angular/forms';
import { Router, Routes, RouterModule } from '@angular/router';
import { CetoDataService, Query__Query } from '../services/ceto-data/ceto-data.service';
import { CookieService } from 'angular2-cookie/core';
import { UserService } from '../services/user.service';


declare var jQuery: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    DashboardService, 
    Notes, 
    DeleteQuery, 
    ShareQuery, 
    ToasterService, 
    cancelNote, 
    newQuery 
    //changeQueryName
    ]
})

export class DashboardComponent implements OnInit {

  private plainDescDiv = true;
  private isEditing = false;

  // Datepicker
  //model;

  private _deleteQuery;

  public getQuery = {};
  public getExport = {};
  public results = {};
  public summaryData = [];
  public resultsQueryNum: number;
  public currentUserCookie: any;
  public overlay = false;

  private qid2expandedH: { [id: number] : boolean } = {};
  

  constructor(
    private _cetoDataService: CetoDataService,
    private _dashSvc: DashboardService, 
    private _elRef: ElementRef,
    private _router: Router,
    private _toasterService: ToasterService,
    private _cookieService: CookieService,
    private _userService: UserService
  ) {
  }

  setExpanded(){
    this._dashSvc.queryC.array().forEach(
      query => {
        let qid = query.id_Query_ID;
        if (this.qid2expandedH[qid] == null) {
          this.qid2expandedH[qid] = false;
        }
      }
    )
  }
  
  ngOnInit() {
    let svc = this;
    this._dashSvc.getQueries().then(function() {
      svc.setExpanded()
    })
    this._dashSvc.getSharedQueries().then(function(){
      svc.setExpanded()
    });

    this.grabCookie();
  }

  grabCookie(){
    //this._cookieService.put('Marvel', 'Hulk')
    //this.currentUserCookie = this._cookieService.getAll();
    //console.log('COOKIE ' + JSON.stringify(this.currentUserCookie))
  }

  replaceLineBreak(s:string) {
    let str = s;
    let newStr = str.replace(/;/g,';<br>-');
    return newStr;
    //return s && s.replace(';',';<br />-');
  }   

  //Shows edit description 
  showEdit(dashboard) {
    dashboard.isEditing = true;
    this.plainDescDiv = false;
    dashboard.txt_Description_Orig = dashboard.txt_Description;
  }
  
  public revealPlus = 'fa-plus';
  publ

  clickExpand(dashboard: Query__Query) {
    let qid = dashboard.id_Query_ID
    this.qid2expandedH[qid] = !this.qid2expandedH[qid];
    // let expanded = this.qid2expandedH[qid]
    // console.log("Hi scott:" + qid + " " + expanded)
    // dashboard.isExpanded = !dashboard.isExpanded;
  }
  //Hides edit description 
  cancelEdit(dashboard) {
    dashboard.isEditing = false;
    this.plainDescDiv = true;
    dashboard.txt_Description = dashboard.txt_Description_Orig;
  }
        
  changeDescription(query){
    this._dashSvc.changeDescription(query);

    query.isEditing = false;
    this.plainDescDiv = true;
  }  
  
  // Should we hide the option?
  hideOption(query:Query__Query, opt: string) {
    if (query.txt_Query_Status_Class_Name == "Ready") {
      if (opt != "status") {
        return 0;
      }
    }
    if (query.txt_Query_Status_Class_Name == "Running") {
      if (opt == "copy" || opt == "share" || opt == "status") {
        return 0;
      }
    }
    if (query.txt_Query_Status_Class_Name == "Draft") {
      if (opt == "edit" || opt == "delete") {
        return 0;
      }
    }
    return 1;
  }

  //Delete query
  deleteQueryVar(query) {
    this._deleteQuery = query;
  }

  deleteQuery(){    
    //console.log("FIX ME: " + JSON.stringify(this._deleteQuery));
    this._dashSvc.deleteQuery(this._deleteQuery);
  }
  
  newQuery(){
    this._dashSvc.newQuery();
  }

  changeQueryName(query){
    this._dashSvc.changeQueryName(query);
    query.isflipped = !query.isflipped;
  }

  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'sharedLibrary') {
      this._dashSvc.getSharedQueries();
    } else if($event.nextId === 'dashQuery'){
      this._dashSvc.getQueries();
    }
  }

  querydataPage(dashboard:any){
    this._router.navigate(['/querydata', dashboard.id_Query_ID]);
  }

  copyQuery(query){
    //console.log('IT IS COPIED ' + JSON.stringify(query.id_Query_ID))
    this._cetoDataService.query.Post_Copy(query.id_Query_ID).subscribe(
      (data) => {
        let copiedqid = data[0]['id_Query_ID'];
        //this._router.navigate(['/querydata', copiedqid]);
        this._dashSvc.getQueries();
      }
    )
  }

  copySharedQuery(query){
    //console.log('COPIED SHARED ' + JSON.stringify(query.id_Query_ID))
    this._cetoDataService.query.Post_Share_Copy(query.id_Query_ID).subscribe(
      (data) => {
        let copiedShareId = data[0]['id_Query_ID'];
        this._router.navigate(['/querydata', copiedShareId]);
      }
    )
  }

  runQuery(dashboard){
    // Get the refesh button to appear immediately
    dashboard.txt_Query_Status_Name = "Starting"
    dashboard.txt_Query_Status_Class_Name = "Running";
    this._cetoDataService.query.Get_Run(dashboard.id_Query_ID).subscribe(
      (data) => {
        this._toasterService.pop('success', 'Your query is now running');
        this._dashSvc.refreshQuery(dashboard.id_Query_ID);
      },
      (err) => this._toasterService.pop('error', 'Your query failed to run')
    )
  }


  deleteResultQuery(result){
    this.resultsQueryNum = result.id_Query_ID;
  }

  deleteResult(event){   
    this._cetoDataService.query.Delete_Result(this.resultsQueryNum).subscribe(
      (data) => {
          this._toasterService.pop('success', 'Your query result was deleted'),
          this._dashSvc.getQueries()       
      },     
      (err) => this._toasterService.pop('error', 'Your query result failed to delete')
    )
    setTimeout(() => {
      jQuery('#resExpand-' + this.resultsQueryNum).click();
    }, 300);
    
  }

  unShare(share){
    this._cetoDataService.query.Delete_Share(share.id_Query_ID).subscribe(
      (data) => {
        this._toasterService.pop('success', 'Your query has been Un-Shared'),
        this._dashSvc.getSharedQueries();
      },
      (err) => this._toasterService.pop('error', 'There was an error. Your query has not been Un-Shared'),
    )
  } 

  statusMessage(){
    jQuery('[data-toggle="tooltip"]').tooltip();
  }

  // public refreshIcon = true;
  //public refreshSpinner = false;

  refreshQuery(dashboard:Query__Query){
    //let storedQueryId = dashboard.id_Query_ID; 
    // this.refreshIcon = false;
    // this.refreshSpinner = true;
    if (dashboard == null) {
      let svc = this;
      this._dashSvc.getQueries().then(function(xx) {
        //console.log("promise resolved: " + xx)
        svc.setExpanded();
        // setTimeout(function(){
        //   svc.refreshIcon = true;
        //   svc.refreshSpinner = false;
        // }, 500)        
      })

    }
    else {
      this._dashSvc.refreshQuery(dashboard.id_Query_ID);
    }
  }

  getUrl(id, fullpath) {
    return this._cetoDataService.query.genResultsQuery(id, fullpath);
  }

  
}
