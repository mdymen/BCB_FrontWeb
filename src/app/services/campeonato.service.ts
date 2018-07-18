import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BackendService } from "../backend.service";
import { Global } from "../config/global.service";

@Injectable()
export class CampeonatoService {

    url;// = "http://www.dymenstein.com/public"

    constructor(private _http:HttpClient, private backend:BackendService) {
        this.url = Global.BACKEND;
    }

    /**
     * Retorna todos los campeonatos con lo minimo necesario de datos
     * "ch_id","ch_acumulado","ch_nome","ch_logocampeonato","ch_id"
     */
    getBasico() {
        return this._http.get(`${this.url}/campeonatos/getbasic`);
    }

   /**
   * retorna uma promesa con los campeonatos abiertos
   */
  public getCampeonatos() {
    return this._http.post(this.backend.getBackEnd() + "/cellgetcampeonatosabertos/?",{})
    .map(campeonato => { return campeonato; } );        
  }

  /**
   * Retorna todos los campeonatos activos
   */
  public load() {
    return this._http.get(this.url + "/campeonatos/get");
  }

  /**
   * Seran asociados esos equipos a ese campeonato
   * @param equipos los equipos que seran asociados a un campeonato determinado
   */
  public save(equipos) {
    return this._http.post(this.url + "/campeonatos/save", equipos);
  }

  /**
   * Carga todos los equipos del campeonato especificado
   * @param idCampeonato 
   */
  public loadByCampeonato(idCampeonato) {
    return this._http.get(this.url + "/campeonatos/getbycampeonato/idCampeonato/" + idCampeonato);
  }

  /**
   * Retorna todas las rodadas del campeonato especificado
   * @param idCampeonato 
   */
  public loadRodadasByCampeonato(idCampeonato) {
    return this._http.get(this.url + "/campeonatos/getrodadas/idCampeonato/" + idCampeonato);
  }

  /**
   * Retorna todos los datos del campeonato con los partidos de la rodada y palpites del usuario
   * @param idUsuario 
   * @param idCampeonato 
   * @param idRodada 
   */
  public loadRodadaPalpitada(idUsuario, idCampeonato, idRodada) {
    return this._http.get(this.url + `/campeonatos/getpartidos/idUsuario/${idUsuario}/idCampeonato/${idCampeonato}/idRodada/${idRodada}`);
  }

  public loadGlobo(cambio, idCampeonato, idRodada) {
    return this._http.post(`${this.url}/campeonatos/globo`, {rodada:cambio, idCampeonato:idCampeonato, idRodada:idRodada});
  }


}