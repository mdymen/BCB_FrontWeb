import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs/Observable';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class CampeonatoService {

  campeonatos = [];

  constructor(private http: HttpClient, private backend: BackendService, private spinnerService: Ng4LoadingSpinnerService) { }

  /**
   * retorna uma promesa con los campeonatos abiertos
   */
  getCampeonatos() {
    this.spinnerService.show();
    return new Promise(resolve =>
      this.http.post(this.backend.getBackEnd() + "cellgetcampeonatosabertos/?", {})
        .subscribe(result => {
          let aux = JSON.stringify(result);
          let campeonatos = JSON.parse(aux);

          for (let campeonato of campeonatos) {
            this.campeonatos.push(campeonato);
          }

          resolve(this.campeonatos);

          this.spinnerService.hide()
        })
    );
  }

}




