import { EventEmitter, Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams   } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { saveQuery } from '../dashboard/queryparameters';

export class HeaderData {
  constructor(
    public id_Header_ID: number,
    public int_Count: number,
    public int_Order: number,
    public txt_Header_Name: string,
    public txt_dimenstion_Name: string,
  ){}
}

export class queryData {
    public id_Query_ID: number = 152
    public txt_Query_Name: string
    public txt_User_Name: string = "bxs"
    public bool_Pct_Chg: boolean
    public bool_Act_Chg: boolean
    public bool_Include_Totals: boolean
    public bool_Share: boolean
    public id_Query_Status_ID: number
    public dt_Create: string
    public dt_Last_Edit: string
    public dt_Last_Run: string
    public dt_Next_Run: string
    public dt_Expiration: string
    public id_Schedule_ID: string
    public txt_Description: string
    public txt_Query_Status: string
    public dt_Schedule_Report: string
}


@Injectable()
export class QueryDataOldService {

  constructor(private _http: Http) { }


 //Get Dimension data for left menue on Query Page.
    getDimensionsData(){
         return this._http.get('http://octopus:9000/api/Segment/Object_Type/eok/1').map(
          (res)=>res.json()
        )
    }

    getHeaderData(headerId): Observable<HeaderData[]>{
      return this._http.get(`http://octopus:9000/api/Segment/Header/ /1/${headerId}`).map(
        (res)=>res.json()
      )
    }

    //Pass header name to back end query to get header values from database.
    // postValueData(){
    //     return this._http.get('./assets/data/getHeaderData.json').map(
    //       (res)=>res.json()
    //     )
    //  }

     //Get hearder values
     getHeaderValues(headerID: number){
        return this._http.get(`http://octopus:9000/api/Segment/Header/Value/eok/${headerID}`).map(
         (res)=>res.json()
       )
     }

     getMeasureValues(){
       return this._http.get('http://octopus:9000/api/Medusa/Measure/eok').map(
         (res)=>res.json()
       )
     }

  fetchData(){
      return this._http.get('./assets/data/stores.json').map(
        (res) => res.json()
      );
    }

    fetchPlayTable(){
      return this._http.get('./assets/data/stores.json').map(
        (res) => res.json()
      );
    }

    saveQueryMethod(save: saveQuery) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `http://octopus:9000/api/Query/Edit`;
    return this._http
              .put(url, JSON.stringify(save), {headers: headers})
              .map(res => res.json())
    }

}


