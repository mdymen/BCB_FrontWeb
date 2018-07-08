import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PaisService {

    url = "http://www.dymenstein.com/public/";

    constructor(private _http:HttpClient) {

    }

    public get() {
        return this._http.get(this.url + "/pais/get");
    }


}