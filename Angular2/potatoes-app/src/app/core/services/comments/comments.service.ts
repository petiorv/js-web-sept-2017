import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

const appKey = "kid_ByMVMM2bf" // APP KEY HERE;
const appSecret = "28cf5abf78ff4d69832eba56cfa47491" // APP SECRET HERE;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;
const host = `https://baas.kinvey.com/appdata`;


@Injectable()
export class CommentsService {

  constructor(private http: HttpClient) {
  }

  getComments(articleId): Observable<any> {
    return this.http.get(`${host}/${appKey}/comments?query={"articleId":"${articleId}"}`, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`guest:guest`))
        .set('Content-Type', 'application/json')
    });
  }

  addComment(comment): Observable<any> {
    const body = JSON.stringify(comment);
    return this.http.post(`${host}/${appKey}/comments`, body, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'))
        .set('Content-Type', 'application/json')
    });
  }

  deleteComment(id, authtoken): Observable<any> {
    return this.http.delete(`${host}/${appKey}/comments/${id}`, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
    });
  }

  getCurrentComment(id): Observable<any> {
    return this.http.get(`${host}/${appKey}/comments/${id}`, {
        headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`guest:guest`))
          .set('Content-Type', 'application/json')
      });
  }

  updateComment(id, obj, authtoken): Observable<any> {
    console.log(obj)
    return this.http.put(`${host}/${appKey}/comments/` + id, JSON.stringify(obj), {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
        .set('Content-Type', 'application/json')
    });
  }
}