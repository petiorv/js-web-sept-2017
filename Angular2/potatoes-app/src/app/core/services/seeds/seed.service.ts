import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

const appKey = "kid_ByMVMM2bf" // APP KEY HERE;
const appSecret = "28cf5abf78ff4d69832eba56cfa47491" // APP SECRET HERE;
const host = `https://baas.kinvey.com/appdata`;


@Injectable()
export class SeedService {

    constructor(private http: HttpClient) {
    }

    getSeeds(): Observable<any> {
        return this.http.get(`${host}/${appKey}/seeds`, {
            headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`guest:guest`))
              .set('Content-Type', 'application/json')
          });
    }

    addSeed(articleModel): Observable<any> {
        const body = JSON.stringify(articleModel);      
        console.log(localStorage.getItem('authtoken'))  
        return this.http.post(`${host}/${appKey}/seeds`, body, {
          headers: new HttpHeaders().set('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'))
            .set('Content-Type', 'application/json')
        });
      }

      deleteSeed(id, authtoken): Observable<any> {
        return this.http.delete(`${host}/${appKey}/seeds/${id}`, {
          headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
        });
      }

      detailsSeed(id): Observable<any> {
        return this.http.get(`${host}/${appKey}/seeds/${id}`, {
            headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`guest:guest`))
              .set('Content-Type', 'application/json')
          });
      }

      updateSeed(id, obj, authtoken): Observable<any> {
        return this.http.put(`${host}/${appKey}/seeds/` + id, JSON.stringify(obj), {
          headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
            .set('Content-Type', 'application/json')
        });
      }
}