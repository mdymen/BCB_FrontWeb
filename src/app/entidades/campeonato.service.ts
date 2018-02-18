import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';

@Injectable()
export class CampeonatoService {

  constructor(private http: HttpClient, private backend : BackendService) { }

  getCampeonatos() {
        //carga todos los campeonatos disponibles
        this.http.post(this.backend.getBackEnd + "cellgetcampeonatosabertos/?", {})
        .subscribe(result => {

          let aux = JSON.stringify(result);
          let campeonatos = JSON.parse(aux);
          
          let listaCampeonatos = [];
          for (let campeonato of campeonatos) {
            listaCampeonatos.push(campeonato);
          }

          return listaCampeonatos;
        });
  }

}
