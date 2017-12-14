import { Injectable } from "@angular/core";


@Injectable()
export class ValidationService {

    constructor() {
    }

    validateObj(obj){
        Object.keys(obj).map((k, v)=>{
            
            if(obj[k].length == 0){
                console.log('false')
                return false;
            }
          })
          return true;
    }

   
}