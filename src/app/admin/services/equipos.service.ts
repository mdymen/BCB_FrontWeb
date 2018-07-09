import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class EquipoService {

    url = "http://www.dymenstein.com/public/";

    constructor(private _http:HttpClient) {

    }

    public save(equipos) {
        return this._http.post(this.url + "/team/post", equipos);
    }

    public loadByPais(pais) {
        return this._http.get(this.url + "team/getbypais/idPais/" + pais);
    }

    public load() {
        return this._http.get(this.url + "team/get");
    }

}