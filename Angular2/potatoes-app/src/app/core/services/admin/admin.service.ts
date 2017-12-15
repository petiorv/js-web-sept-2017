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

    isUserLogged(){
        if(localStorage.length == 0){
            return false;
        } else { 
            return true;
        }
    }

    getLoggedUser(){
        return localStorage.getItem('username');
    }
}