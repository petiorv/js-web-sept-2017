import { Injectable } from "@angular/core";


@Injectable()
export class ValidationService {

    constructor() {
    }

    validateObj(obj) {
        let cnt: number = 0;
        Object.keys(obj).map((k, v) => {

            if (obj[k].length == 0) {
                cnt++;
            }
        })
        if (cnt !== 0) {
            return false;
        }
        return true;
    }


}