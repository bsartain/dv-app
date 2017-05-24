import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams,  RequestOptionsArgs } from '@angular/http';
import { Router, Routes, RouterModule } from '@angular/router';
import { ToasterContainerComponent, ToasterService } from 'angular2-toaster';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Notes, DeleteQuery, ShareQuery, cancelNote, newQuery, changeQueryName } from './queryparameters';
import { Observable } from "rxjs/Observable";
import { CetoDataService, Query__Query, Medusa__Result } from "../services/ceto-data/ceto-data.service"
import { Container } from "../query-page/query-page.defs";

@Injectable()
export class DashboardService{

  public queryC: Container<Query__Query> = new Container<Query__Query>("id_Query_ID");
  public querySharedC: Container<Query__Query> = new Container<Query__Query>("id_Query_ID");
  public queryD: Container<Query__Query> = new Container<Query__Query>("id_Query_ID");
  public refreshClass: string;
  constructor(
    private _http: Http,
    private _cetoDataService: CetoDataService,
    private _router: Router,
    private _toasterService: ToasterService,
    private _ref: ChangeDetectorRef
  ) { }

  getQueries() {
    var svc = this;
    let mypromise = new Promise (
        function (resolve, reject) {
          if(1){
          svc._cetoDataService.query.Get_Query().subscribe(
            (data) => {
              let queryA: Query__Query[] = data;
              svc.queryC.empty();
              queryA.forEach(q => {
                q.resultA = [];
                //q.isExpanded = false;
                svc.queryC.push(q);
              });
              
              svc._cetoDataService.query.Get_Results().subscribe(
                data => {
                  let resA: Medusa__Result[] = data;
                  resA.forEach(res => {
                    let q:Query__Query = svc.queryC.find(res.id_Query_ID);
                    q.resultA.push(res);
                  })
                
                },
                
              )              
          }); 
          resolve(1)
        }
      }
    )
    return mypromise;
  }

  getSharedQueries() {
    var svc = this;
    let mypromiseShared = new Promise(
      function(resolve, reject) {
        if(1){
          svc._cetoDataService.query.Get_Share().subscribe(
            (data) => {
              let queryA: Query__Query[] = data;
              svc.querySharedC.empty();
              queryA.forEach(query => {
                svc.querySharedC.push(query);
              });
          });
          resolve(1)
        }
      }
    )
    return mypromiseShared    
  }

  //Service that handles the updating of "Edit Notes" section in Dashboard
  changeDescription(query) {
    this._cetoDataService.query.Put_Description(query.id_Query_ID, query.txt_Description).subscribe(
      (data) => this._toasterService.pop('success', 'Your note was updated'),
      (err) => this._toasterService.pop('error', 'Your note failed to update'),
      () => console.log('Request complete')
    )
  }

  //Service that handles deleting queries from the dashboard.
  deleteQuery(query) {
    this._cetoDataService.query.Delete_Query(query.id_Query_ID).subscribe(
      (data) => {
        this._toasterService.pop('success', 'Your query was deleted')
        this.queryC.remove(query.id_Query_ID)
      },
      (err) => this._toasterService.pop('error', 'Your query was not deleted', 'An error occured in the system'),
      () => console.log('Request complete')
    );
  }

  //Service that handles the sharing of queries
  shareQuery(id_Query_ID: number) {
    this._cetoDataService.query.Post_Share(id_Query_ID).subscribe(
      (data) => this._toasterService.pop('success', 'Your query was shared', 'Your query can now be viewed within the shared tab'),
      (err) => this._toasterService.pop('error', 'Your query was not shared', 'There was an error when trying to share your query'),
      () => console.log('Request complete')
    )
  }
  newQuery(){
    this._cetoDataService.query.Post_Query().subscribe(
      (data) => this._router.navigate(['/querydata', data[0]['id_Query_ID']])
    );
  }

  changeQueryName(query:Query__Query){
    this._cetoDataService.query.Put_Name(query.id_Query_ID, query.txt_Query_Name).subscribe(
      (data) => this._toasterService.pop('success', 'Your query name has been changed'),
      (err) => this._toasterService.pop('error', 'Your query was not changed. There was an error'),
      () => console.log('Request complete')
    )
  }

  refreshQuery(id_Query_ID:number){    
    this._cetoDataService.query.Get_Query(id_Query_ID).subscribe(
      (data) => {
        let query: Query__Query = data[0];
        query.resultA = [];
        this._cetoDataService.query.Get_Results(id_Query_ID).subscribe(
          data => {
            let resA: Medusa__Result[] = data;
            resA.forEach(res => {
              query.resultA.push(res);
            })
            this.queryC.replace(query)
          },
        )
      }
    );
    
  }

}
