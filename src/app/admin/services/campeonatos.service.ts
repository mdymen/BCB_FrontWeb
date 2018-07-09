import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CampeonatoService {

    url = "http://www.dymenstein.com/public/"

    constructor(private _http:HttpClient) {}

    load() {
        return this._http.get(this.url + "get");
    }

}