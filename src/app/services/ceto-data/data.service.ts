import { Injectable, Injector } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserService } from "../user.service"
import { Observable } from "rxjs/Observable";


@Injectable()
export class DataService {

  debug: boolean = true;
  
  private _http: Http;
  protected _userService: UserService;

  private url:string;
  protected xpdb:string;

  constructor( injector: Injector ) { 
    this._userService = injector.get(UserService);
    this._http = injector.get(Http);
    this.url = this._userService.data_server_URL();
    this.xpdb = this._userService.xpdb();
  }
  
  protected getBaseUrl() {
    return this.url;
  }

  protected get(cmd: string){
    if (this.debug) { console.log("DataService: get:  " + cmd) }
    return this._http.get(this.url + cmd).map(
      (res) => {
        // console.log("Return:  " + cmd )
        // console.log(res)
        // console.log(res.json())
        return res.json()
      }
    );

  }

  protected put(cmd: string, body:string){
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    if (this.debug) { console.log("DataService: put:  " + cmd + " | " + body) }
    return this._http
              .put(this.url + cmd, body, {headers: headers})
              .map(res => res.json())
              .catch(this.handleError)
  }

  protected post(cmd: string, body:string){
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    if (this.debug) { console.log("DataService: post:  " + cmd + " | " + body) }
    return this._http
              .post(this.url + cmd, body, {headers: headers})
              .map(res => {
                return res.json()
              })
              .catch(this.handleError)
  }

  protected delete(cmd: string): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    if (this.debug) { console.log("DataService: delete:  " + cmd) }
    return this._http
              .delete(this.url + cmd, {headers: headers})
              .map(res => res.json())
              .catch(this.handleError)
  }


  //Handles errors on http requests
  private handleError(error: any):Promise<any>{
      console.log('An error occured with your request: ' + error + " | " + error.message);
      
      // let text = `
      // <div class='alert alert-danger alert-dismissable fade in'>
      //   <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>
      //   <strong>There was an error with your request. Error Message: </strong>
      // `+ error +`</div>
      // ` ;
      // document.getElementById("sbAlert").innerHTML = text;
      return Promise.reject(error.message || error);      
    }


}
