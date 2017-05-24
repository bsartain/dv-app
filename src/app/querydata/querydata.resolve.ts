import { Injectable, EventEmitter } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CetoDataService } from "../services/ceto-data/ceto-data.service"

@Injectable()
export class QueryDataResolve implements Resolve<any> {

  constructor(private _cetoDataService: CetoDataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this._cetoDataService.query.Put_Edit(route.params['id_Query_ID']);    
  } 
}