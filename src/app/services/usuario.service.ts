import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable() 
export class UsuarioService {

    url = "http://www.dymenstein.com/public/";

    constructor(private _http:HttpClient) {

    }

    public getPalpites(idUsuario, limit) {
        return this._http.get(`${this.url}/usuario/getpalpites/idUsuario/${idUsuario}/limit/${limit}`);
    }

    public setTimeCoracao(idUsuario, idEquipo) {
        return this._http.post(`${this.url}/usuario/posttimecoracao/`, {idUsuario : idUsuario, idEquipo : idEquipo} );
    }

}