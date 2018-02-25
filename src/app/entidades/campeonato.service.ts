import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class CampeonatoService {

  campeonatos = [];

  constructor(private http: HttpClient, 
    private backend: BackendService, 
    private spinnerService: Ng4LoadingSpinnerService) { }

  /**
   * retorna uma promesa con los campeonatos abiertos
   */
  public getCampeonatos() {
    return this.http.post(this.backend.getBackEnd() + "cellgetcampeonatosabertos/?",{})
    .map(campeonato => { return campeonato; } );        
  }

}