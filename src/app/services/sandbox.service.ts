import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Post } from './post';
import 'rxjs/add/operator/map';

@Injectable()
export class SandboxService {  

  constructor(private _http: Http) { }

  fetchPostMethod(){
    return this._http.get('https://jsonplaceholder.typicode.com/posts').map(
      (res) => res.json()
    )
  }

  updatePostMethod(post: Post) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `https://jsonplaceholder.typicode.com/posts/${post.id}`

    return this._http
              .put(url, JSON.stringify(post), {headers: headers})
              .map(res => res.json())
              .catch(this.handleError);
  }

   deletePostMethod(post: Post) {

    let url = `https://jsonplaceholder.typicode.com/posts/${post.id}`
    
    return this._http
              .delete(url)
              .map(res => res.json())
              .catch(this.handleError);
    }

    private handleError(error: any):Promise<any>{
      // alert('An error occured in your request: ' + error);
      console.log('An error occured in your request: ' + error);
      
      let text = `
      <div class='alert alert-danger alert-dismissable fade in'>
        <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>
        <strong>There was an error with your request. Error Message: </strong>
      `+ error +`</div>
      ` ;
      document.getElementById("sbAlert").innerHTML = text;
      return Promise.reject(error.message || error);
      
    }


}
