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
     * 
     * -------
     * PARTIDO
     * -------
     * @param mt_id 
     * @param mt_goal1
     * @param mt_goal2
     * @param mt_idteam1
     * @param mt_idteam2
     * @param mt_idchampionship
     * @param mt_played
     * @param mt_date
     * @param mt_idround
     */
    public save(partidos) {
        return this._http.post(`${this.url}/partidos/put`, {partidos:partidos});
    }

    /**
     * Lista de los proximos partidos
     */
    public games() {
        return this._http.get(`${this.url}/index/games`);
    }

    /**
     * Lista de los ultimos partidos jugados
     */
    public ultimosJugados() {
        return this._http.get(`${this.url}/partidos/ultimosjugados`)
    }

    /**
     * Devuelve una lista de los partidos de ayer, de hoy y de maniana.
     */
    public getPartidosRecientes() {
        return this._http.get(`${this.url}/partidos/getproximos`)
    }

    public getByCampeonatoAndDate(idCampeonato) {
        return this._http.get(`${this.url}/partidos/getjogosbycampeonatoanddate/idCampeonato/${idCampeonato}`)
    }

    /**
     * Retorna todos los partidos que se jugarán maniana
     */
    public getPost(tipo, idCampeonato?) {
        let campeonato = idCampeonato ? idCampeonato : "00";
        return this._http.get(`${this.url}/partidos/getpost/tag/${tipo}/idCampeonato/${campeonato}`)
    }

    public manualPost(tipo, idCampeonato?) {
        let campeonato = idCampeonato ? idCampeonato : "00";

        let post = {
            tag:tipo,
            idCampeonato:idCampeonato
        }

        return this._http.post(`${this.url}/facebook/manualpost/`,post);
    }

    public getPosterior(id) {
        return this._http.get(`${this.url}/facebook/getpostposterior/id/${id}`);
    }

}