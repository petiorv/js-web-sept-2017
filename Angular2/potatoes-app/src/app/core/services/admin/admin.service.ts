import { Injectable } from "@angular/core";


@Injectable()
export class AdminService {

    constructor() {
    }

    isAdmin(){
        if(localStorage.getItem('username') === 'petio'){
            return true;
        } else{ 
            return false;
        }
    }

    getLoggedUser(){
        return localStorage.getItem('username');
    }
}