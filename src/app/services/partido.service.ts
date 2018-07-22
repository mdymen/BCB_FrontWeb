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


    /**
     * Retorna los partidos de la rodada especificada
     * @param idCampeonato
     * @param idRodada
     */
    public getPartidos(idCampeonato, idRodada) {
        return this._http.get(`${this.url}/partidos/get/idCampeonato/${idCampeonato}/idRodada/${idRodada}`);
    }

    /**
     * Actualiza la lista de partidos. Si el partido no existe entonces lo crea y si existe 
     * coloca el resultado y actualiza la puntuacion del usuario
     * @param partidos lista de partidos para grabar
     */
    public save(partidos) {
        return this._http.post(`${this.url}/partidos/put`, {partidos:partidos});
    }
}