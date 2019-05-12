import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HeaderService } from "../../services/header.service";
import { Global } from "../../config/global.service";

@Injectable()
export class EquipoService extends HeaderService {

    url;

    constructor(public _http:HttpClient) {
        super(_http);
        super(_http);
        this.url = Global.BACKEND;
    }

    /**
     * Salva los equipos
     * @param equipos 
     */
    public save(equipos) {
        return this.post(this.url + "/team/post", equipos);
    }

    public loadByPais(pais) {
        return this.get(this.url + "/team/getbypais/idPais/" + pais);
    }

    public load() {
        return this.get(this.url + "/team/get");
    }

}