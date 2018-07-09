import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BackendService } from "../../backend.service";

@Injectable()
export class PartidosService {

    url;

    constructor(private _http: HttpClient,
        private _backend: BackendService) {
        this.url = this._backend.getBackEndAdmin();
    }

    /**
     * Graba todos los partidos del campeonato y la rodada especificadas.
     * Formato de cada partido:
     *  date: string
     *  hora: string
     *  team1: number
     *  team2: number
     *  champ: number
     * @param partidos 
     */
    save(partidos) {
        return this._http.post(this.url + "/index/salvarpartidos", partidos);
    }




}