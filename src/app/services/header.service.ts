import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { BackendService } from "../backend.service";
import { Global } from "../config/global.service";

@Injectable()
export class HeaderService {
    
    header = new HttpHeaders().set("Authorization", localStorage.getItem("token"));

    constructor(public _http:HttpClient) {
    }

    post(url, parametros) {
        return this._http.post(url ,parametros, {headers: this.header});
    }

    get(url) {
        return this._http.get(url, {headers: this.header});
    }

}