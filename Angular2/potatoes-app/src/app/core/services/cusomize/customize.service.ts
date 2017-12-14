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
export class CustomizeService {

    constructor(private http: HttpClient) {
    }

    getImages(): Observable<any> {
        return this.http.get(`${host}/${appKey}/customize`, {
            headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${localStorage.getItem('username')}:${localStorage.getItem('pass')}`))
                .set('Content-Type', 'application/json')
        });
    }


    UpdateImages(id, obj, authtoken): Observable<any> {
        return this.http.put(`${host}/${appKey}/articles/` + id, JSON.stringify(obj), {
            headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
                .set('Content-Type', 'application/json')
        });
    }
}