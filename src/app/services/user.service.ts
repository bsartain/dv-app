import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class UserService {

  public currentUserCookie: any;

  constructor(private _cookieService: CookieService) { 
  }

  ngOnInit(){
    
  }

  getCookie(key: string){
    return this._cookieService.get(key);
  }

  name() { 
    //this._cookieService.put('ASP.NET_SessionId', 'bxs')
    // this.currentUserCookie = this.getCookie('ASP.NET_SessionId');
    // console.log('COOKIE ' + JSON.stringify(this.currentUserCookie))
    // if (this.currentUserCookie == null) {
    //   return "dvtech"
    // } else {
    //   return this.currentUserCookie
    // }
    // console.log('COOKIE ' + JSON.stringify(this.currentUserCookie))
    return "sgw";
    //return "dvtech";
  }

  data_server_URL () : string {
    return `http://localhost:9000/api/`;
  }

  xpdb() : string {
    return "fdln"
  }
  segment_id() {
    return 1;
  }

}
