import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BackendService } from "../backend.service";
import { Global } from "../config/global.service";
import { HeaderService } from "./header.service";

@Injectable()
export class PartidoService extends HeaderService {

    url;

    constructor(public _http:HttpClient, private backend:BackendService) {        
        super(_http);
        this.url = Global.BACKEND;        
    }


    /**
     * Retorna los partidos de la rodada especificada
     * @param idCampeonato
     * @param idRodada
     */
    public getPartidos(idCampeonato, idRodada) {
        return this.get(`${this.url}/partidos/get/idCampeonato/${idCampeonato}/idRodada/${idRodada}`);
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
        return this.post(`${this.url}/partidos/put`, {partidos:partidos});
    }

    /**
     * Devuelve una lista de los partidos de ayer, de hoy y de maniana.
     */
    public getPartidosRecientes() {
        return this.get(`${this.url}/partidos/getproximos`)
    }

    public getByCampeonatoAndDate(idCampeonato) {
        return this.get(`${this.url}/partidos/getjogosbycampeonatoanddate/idCampeonato/${idCampeonato}`)
    }

    /**
     * Retorna todos los partidos que se jugarán maniana
     */
    public getPost(tipo, idCampeonato?) {
        let campeonato = idCampeonato ? idCampeonato : "00";
        return this.get(`${this.url}/partidos/getpost/tag/${tipo}/idCampeonato/${campeonato}`)
    }

    public manualPost(tipo, idCampeonato?) {
        let campeonato = idCampeonato ? idCampeonato : "00";

        let post = {
            tag:tipo,
            idCampeonato:idCampeonato
        }

        return this.post(`${this.url}/facebook/manualpost/`,post);
    }

    public getPosterior(id) {
        return this.get(`${this.url}/facebook/getpostposterior/id/${id}`);
    }

    /**
     * Retorna todos los partidos de la fecha especificada
     */
    public getPartidosByDate(date) {
        return this.get(`${this.url}/partidos/bydate/date/${date}`)
    }

    public postTeste() {
        return this.post(`${this.url}/partidos/postteste`,{})
    }

    public postTexto(id) {
        return this.post(`${this.url}/facebook/postfacebook`,{id});
    }

}