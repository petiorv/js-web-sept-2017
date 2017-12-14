import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
// import { ArticleModel } from '../models/aritcles/article.model';

const appKey = "kid_ByMVMM2bf" // APP KEY HERE;
const appSecret = "28cf5abf78ff4d69832eba56cfa47491" // APP SECRET HERE;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;
const host = `https://baas.kinvey.com/appdata`;


@Injectable()
export class ArticlesService {

    constructor(private http: HttpClient) {
    }

    getArticles(): Observable<any> {
        return this.http.get(`${host}/${appKey}/articles`, {
            headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`guest:guest`))
              .set('Content-Type', 'application/json')
          });
    }

    addArticle(articleModel): Observable<any> {
        const body = JSON.stringify(articleModel);      
        console.log(localStorage.getItem('authtoken'))  
        return this.http.post(`${host}/${appKey}/articles`, body, {
          headers: new HttpHeaders().set('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'))
            .set('Content-Type', 'application/json')
        });
      }

      deleteArticle(id, authtoken): Observable<any> {
        return this.http.delete(`${host}/${appKey}/articles/${id}`, {
          headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
        });
      }

      detailsArticle(id): Observable<any> {
        return this.http.get(`${host}/${appKey}/articles/${id}`, {
            headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${localStorage.getItem('username')}:${localStorage.getItem('pass')}`))
              .set('Content-Type', 'application/json')
          });
      }

      updateArticle(id, obj, authtoken): Observable<any> {
        return this.http.put(`${host}/${appKey}/articles/` + id, JSON.stringify(obj), {
          headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
            .set('Content-Type', 'application/json')
        });
      }
}