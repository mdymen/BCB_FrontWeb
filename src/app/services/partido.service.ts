import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BackendService } from "../backend.service";
import { Global } from "../config/global.service";

@Injectable()
export class PartidoService {

    url;

    constructor(private _http:HttpClient, private backend:BackendService) {
        this.url = Global.BACKEND;
    }


    public getPartidos(idCampeonato, idRodada) {
        return this._http.get(`${this.url}/partidos/get/idCampeonato/${idCampeonato}/idRodada/${idRodada}`);
    }
}