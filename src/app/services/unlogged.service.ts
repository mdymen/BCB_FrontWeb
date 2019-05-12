import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BackendService } from "../backend.service";
import { Global } from "../config/global.service";

@Injectable()
export class UnloggedService {

    url;// = "http://www.dymenstein.com/public"

    constructor(private _http: HttpClient, private backend: BackendService) {
        this.url = Global.BACKEND;
    }

    /**
     * Verifica si hay partidos que precisan ser actualizados
     */
    public updatePartidos() {
        return this._http.get(`${this.url}/aquehorajuega/updatesecuencial`);
    }

    /**
     * Lista de los proximos partidos
     */
    public games() {
        return this._http.get(`${this.url}/unlogged/games`);
    }

    /**
     * Lista de los ultimos partidos jugados
     */
    public ultimosJugados() {
        return this._http.get(`${this.url}/unlogged/ultimosjugados`)
    }

}