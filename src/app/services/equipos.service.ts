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

    /**
     * Retorna todos los ultimos partidos registrados del equipo
     * @param idEquipo id del equipo
     * @param limite cantidad de partidos para cargar
     */
    getPartidos(idEquipo, limite) {
        return this._http.get(`${this.url}/equipos/getpartidos/idEquipo/${idEquipo}/limite/${limite}`);
    }

    /**
     * Retorna todos los equipos registrados del pais deseado
     * @param idPais id del pais que se desea cargar los equipos
     */
    getTimes(idPais) {
        return this._http.get(`${this.url}/equipos/gettimes/idPais/${idPais}`);
    }


}