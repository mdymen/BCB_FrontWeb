import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend.service';
import { CampeonatoService } from '../../services/campeonato.service';

@Component({
  selector: 'app-setrodada',
  templateUrl: './setrodada.component.html',
  styleUrls: ['./setrodada.component.css']
})
export class SetrodadaComponent implements OnInit {

  campeonatos = [];
  rodadas = [];
  campeonato: any;
  rodada:any;
  cargoCampeonato = false;

  constructor(
    private http: HttpClient, 
    private backend: BackendService, 
    private campeonatoService:CampeonatoService, 
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.campeonatoService.getCampeonatos().subscribe(result => {
      this.campeonatos = result as any[];
      console.log(result);
      this.spinnerService.hide();
    }); 
  }

  seleccionarCampeonato(campeonato) {
    this.campeonato = campeonato;
    this.spinnerService.show();
    this.http.post(this.backend.getBackEndAdmin() + "resultados/cargarpartidos?", { champ: campeonato })
      .subscribe(result => {
        result['rounds'].map(round => { this.rodadas.push(round); });
        this.cargoCampeonato = true;
        this.spinnerService.hide();
      })
  }

  seleccionarRodada(rodada) {
    this.rodada = rodada;
  }

  grabar() {
    this.spinnerService.show();
    this.http.post(this.backend.getBackEndAdmin() + "rodada/setrodada?", 
      { champ_selected: this.campeonato, ronda : this.rodada })
    .subscribe(result => {
      this.spinnerService.hide();
      console.log(result);
    })
  }
}
