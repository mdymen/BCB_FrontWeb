import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class EquiposService {

    url = "http://www.dymenstein.com/public/"

    constructor(private _http:HttpClient){}

    loadTabla(idCampeonato) {
        return this._http.get(`${this.url}/equipos/getbycampeonato/idCampeonato/${idCampeonato}`);
    }

    get(idEquipo) {
        return this._http.get(`${this.url}/equipos/get/idEquipo/${idEquipo}`);
    }

    getPartidos(idEquipo, limite) {
        return this._http.get(`${this.url}/equipos/getpartidos/idEquipo/${idEquipo}/limite/${limite}`);
    }


}