import { Component, OnInit } from '@angular/core';
import { CargarcampeonatoComponent } from '../cargarcampeonato/cargarcampeonato.component';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend.service';
import { CampeonatoService } from '../../entidades/campeonato.service';
import { Observable } from 'rxjs/Observable';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent implements OnInit {

  campeonatos = [];
  cargoCampeonato = false;
  partidos = [];
  campeonato: any;

  cargoRodada = false;
  rodadas = [];

  url = "http://www.dymenstein.com";

  constructor(private http: HttpClient, 
    private backend: BackendService, 
    private campeonatoService:CampeonatoService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    //carga todos los campeonatos disponibles
    this.spinnerService.show();
    this.campeonatoService.getCampeonatos().subscribe(result => {
      this.campeonatos = result as any[];
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
    this.http.post(this.backend.getBackEndAdmin() + "resultados/cargarpartidos?",
      { champ: this.campeonato, ronda: rodada })
      .subscribe(result => {
        this.cargoRodada = true;
        this.partidos = [];
        result['matchs'].map(match => { this.partidos.push(match); });
      });
  }

  grabarResultados(partidos: any) {
    this.spinnerService.show();
    let resultados = [];
    partidos.map(partido => {
      if (partido.mt_goal1 && partido.mt_goal2) {
        resultados.push(new Resultado(
          partido.mt_id,
          partido.mt_goal1,
          partido.mt_goal2,
          partido.mt_idteam1,
          partido.mt_idteam2,
          partido.ch_id,
          partido.mt__played
        ));
      }
    });
    this.http.post(this.backend.getBackEndAdmin() + "resultados/grabarresultados?",
      { results: resultados })
      .subscribe(result => {
        console.log(result);
        this.spinnerService.hide();
      })
  }


}

export class Resultado {

  constructor(private match: number,
    private res1: number,
    private res2: number,
    private team1: number,
    private team2: number,
    private champ: number,
    private played: number) {

  }
}