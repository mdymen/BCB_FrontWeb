import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Global } from "../config/global.service";
import { HeaderService } from "./header.service";

@Injectable()
export class EquiposService extends HeaderService {

    url;

    constructor(public _http:HttpClient){
        super(_http)
        this.url = Global.BACKEND;
    }

    loadTabla(idCampeonato) {
        return this.get(`${this.url}/equipos/getbycampeonato/idCampeonato/${idCampeonato}`);
    }

    getEquipo(idEquipo) {
        return this.get(`${this.url}/equipos/get/idEquipo/${idEquipo}`);
    }

    /**
     * Retorna todos los ultimos partidos registrados del equipo
     * @param idEquipo id del equipo
     * @param limite cantidad de partidos para cargar
     */
    getPartidos(idEquipo, limite) {
        return this.get(`${this.url}/equipos/getpartidos/idEquipo/${idEquipo}/limite/${limite}`);
    }

    /**
     * Retorna todos los equipos registrados del pais deseado
     * @param idPais id del pais que se desea cargar los equipos
     */
    getTimes(idPais) {
        return this.get(`${this.url}/equipos/gettimes/idPais/${idPais}`);
    }


}