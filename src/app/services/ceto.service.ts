import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Notes, DeleteQuery, ShareQuery } from './queryparameters';
declare var firebaseio: any; // Declare variable to use firebase api

@Injectable()
export class CetoService {
  
  
  constructor(private _http: Http) { }

  // fetchData() {
  //   return this._http.get('./assets/data/stores.json').map(
  //     (res) => res.json()
  //   );
  // }

  // dashboardData(){
  //   return this._http.get('http://octopus:9000/api/query/bxs').map(
  //     (res) => res.json()
  //   );
  // }

  // sharedQueryLibrary(){
  //   return this._http.get('http://octopus:9000/api/Query/Share').map(
  //     (res) => res.json()
  //   );
  // }

  // //Service that handles the updating of "Edit Notes" section in Dashboard
  // updateDashNotesMethod(notes: Notes) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');

  //   let url = `http://octopus:9000/api/Query/Description/`;
  //   return this._http
  //             .put(url, JSON.stringify(notes), {headers: headers})
  //             .map(res => res.json())
  //             .catch(this.handleError);
  // }

  // //Service that handles deleting queries from the dashboard.
  // deleteQueriesMethod(deleteQuery: DeleteQuery) {

  //   let body = JSON.stringify(deleteQuery)
  //   let headers = new Headers({'Content-Type':'application/json'})
  //   let options = new RequestOptions({
  //     headers: headers,
  //     body: body
  //   })

  //   let url = `http://octopus:9000/api/Query`;
  //   return this._http
  //             .delete(url, options)
  //             .map(res => res.json())
  //             .catch(this.handleError);
  // }

  // //Service that handles the sharing of queries
  // shareQueryMethod(share: ShareQuery) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');

  //   let url = `http://octopus:9000/api/Query/Share`;
  //   return this._http
  //             .put(url, JSON.stringify(share), {headers: headers})
  //             .map(res => res.json())
  //             .catch(this.handleError);
  // }

  // //Handles errors on http requests
  // private handleError(error: any):Promise<any>{
  //     // alert('An error occured in your request: ' + error);
  //     console.log('An error occured with your request: ' + error);
      
  //     let text = `
  //     <div class='alert alert-danger alert-dismissable fade in'>
  //       <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>
  //       <strong>There was an error with your request. Error Message: </strong>
  //     `+ error +`</div>
  //     ` ;
  //     document.getElementById("sbAlert").innerHTML = text;
  //     return Promise.reject(error.message || error);
      
  //   }


}


