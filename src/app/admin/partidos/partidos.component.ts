import { Component, OnInit } from '@angular/core';
import { CargarcampeonatoComponent } from '../cargarcampeonato/cargarcampeonato.component';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend.service';

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

  constructor(private http: HttpClient, private backend: BackendService) { }

  ngOnInit() {
    //carga todos los campeonatos disponibles
    this.http.post(this.backend.getBackEnd() + "cellgetcampeonatosabertos/?", {})
      .subscribe(result => {
        let aux = JSON.stringify(result);
        let campeonatos = JSON.parse(aux);

        for (let campeonato of campeonatos) {
          this.campeonatos.push(campeonato);
        }

      });
  }

  seleccionarCampeonato(campeonato) {
    this.campeonato = campeonato;
    this.http.post(this.backend.getBackEndAdmin() + "resultados/cargarpartidos?", { champ: campeonato })
      .subscribe(result => {
        result['rounds'].map(round => { this.rodadas.push(round); });
        this.cargoCampeonato = true;
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
    let resultados = [];
    partidos.map(partido => {
      if (partido.mt_goal1 && partido.mt_goal2) {
        resultados.push(new Resultado(
          partido.mt_id,
          partido.mt_goal1,
          partido.mt_goal2,
          partido.mt_idteam1,
          partido.mt_idteam2,
          partido.ch_id
        ));
      }
    });
    this.http.post(this.backend.getBackEndAdmin() + "resultados/grabarresultados?",
      { resultados: resultados })
      .subscribe(result => {
        console.log(result);
      })
  }


}

export class Resultado {

  constructor(private match: number,
    private res1: number,
    private res2: number,
    private team1: number,
    private team2: number,
    private champ: number) {

  }
}