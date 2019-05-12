import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Global } from "../config/global.service";
import { HeaderService } from "./header.service";


@Injectable()
export class RodadaService extends HeaderService {

    url;

    constructor(public _http:HttpClient) {
        super(_http);
        this.url = Global.BACKEND;
    }

    /**
     * Salva la rodada
     * 
     * @param champ
     * @param rodada
     * @param suma
     */
    public postRodada(champ, rodada, suma, cambio) {
        return this.post(`${this.url}/rodada/post`, {champ:champ, rodada:rodada, suma:suma, cambio:cambio});
    }

    public ranking(idRodada) {
        return this.get(`${this.url}/rodada/ranking/idRodada/${idRodada}`);
    }

}