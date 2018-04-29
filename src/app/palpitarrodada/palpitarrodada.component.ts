import { Component, OnInit, Input } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Partido } from '../partido';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FechaService } from '../fecha.service';
import { BackendService } from '../backend.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-palpitarrodada',
  templateUrl: './palpitarrodada.component.html',
  styleUrls: ['./palpitarrodada.component.css']
})

export class PalpitarrodadaComponent implements OnInit {

  campeonatos = [];
  @Input() partidos = [];
  campeonato;
  campeonatoActualObjeto: any;
  url = "http://www.dymenstein.com";
  rodadas = [];
  campeonatoActual = 0;
  palpitesRealizados = false;

  //para almazenar el id de la rodada actual para setear
  //la classs active
  rodadaActual = 0;

  //indica si ya fue seleccionado un campeonato y cargado. 
  //sirve para mostrar el HTML en la pantalla;
  cargoCampeonato = false;

  //toda la informacion de la rodada marcada
  rodadaActualObjeto: any;
  rodadaPaga: boolean;

  //si intenta comprar una rodada y no tiene guita suficiente
  //esta variable es usada para mostrar el mensaje de error.
  semDinheiro:boolean = false;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private fechaService: FechaService,
    private backEndService: BackendService,
    private location: Location) {

  }

  ngOnInit() {

    //carga los dados del campeonato en funcion de los parametros de la url
    this.route.params.subscribe(params => {

      //si no hay valor en la variable rodada, significa que el parametro
      //de la url rodada viene vacio, entonces tiene que cargar la 
      //rodada actual activa del campeonato
      if (params['rodada']) {
        this.rodadaActual = params['rodada'];
      } else {
        this.rodadaActual = null;
      }

      //si no hay valor en la variable campeonato, significa que el parametro
      //de la url campeonato viene vacio
      if (params['campeonato']) {
        this.campeonatoActual = params['campeonato'];
        this.onChange();
      } else {
        this.campeonatoActual = null;
      }

    });
    this.spinnerService.show();
    //carga todos los campeonatos disponibles
    this.http.post(this.url + "/public/mobile/cellgetcampeonatosabertos/?", {})
      .subscribe(result => {
        let aux = JSON.stringify(result);
        let campeonatos = JSON.parse(aux);
        for (let campeonato of campeonatos) {
          this.campeonatos.push(campeonato);
        }
        this.setCampeonatoActivo();
        this.spinnerService.hide();
      });
  }

  /**
   * carga todo lo necesario para realizar los palpites del campeonato y de la rodada
   */
  public onChange(): void {

    this.http.post(this.url + "/public/mobile/cellbolao",
      { id: localStorage.getItem("id"), champ: this.campeonatoActual, rodada: this.rodadaActual })
      .subscribe(res => {

        console.log(res);

        if (res['status'] === 200) {
          console.log(res);
          this.campeonatoActualObjeto = res['championship'];
          console.log(this.campeonatoActualObjeto);
          this.cargoCampeonato = true;

          //carga la rodada actual
          this.rodadaActual = res['n_rodada'];

          //carga los numeros de las rodadas para ser seleccionadas
          let rondas = [];
          rondas.push(res['rondas']);
          this.rodadas = rondas[0];

          //para pintar la rodada activa
          for (let rodada of this.rodadas) {
            if (rodada.rd_id == this.rodadaActual) {
              rodada.active = "active";
              this.rodadaActualObjeto = rodada;
            }
          }

          this.setCampeonatoActivo();

          //carga los partidos
          for (let partido of res['rodada']) {
            let partidoJson = <Partido>partido;
            partidoJson.disabled = this.fechaService.puedePalpitar(partidoJson.mt_date) ? null : "disabled";
            partidoJson.played = partido.mt_played == 1 ? "display: block" : "display: none";
            partidoJson.acerto = this.verificarResultadoPalpitado(partidoJson) ? "label-success" : "label-danger";
            this.partidos.push(partidoJson);
          }

          this.rodadaActualObjeto = res['rodadaAtual'][0];
          this.rodadaPaga = true;
          if (!res['rodadaAtual'][0].rd_custo) {
            this.rodadaPaga = false;
          }

          if (res['rodadaAtual'][0].ru_pago === "1") {
            this.rodadaPaga = false;
          }

        } else {
          console.log(res);
        }

      })
  }

  verificarResultadoPalpitado(partido: Partido) {
    if (partido.mt_goal1 == partido.rs_res1
      && partido.mt_goal2 == partido.rs_res2) {
      return true;
    }
    return false;
  }


  /**
   * Crea o actualiza todos los palpites de la rodada this.rodadaActual 
   * y del campeonato this.campeonatoActual
   * @param value todos los partidos con los palpites realizados
   */
  logForm(value: any) {
    this.spinnerService.show();
    let palpitados = [];
    for (let partido of value) {
      let pJson = <Partido>partido;
      if (pJson.rs_res1 !== null && pJson.rs_res2 !== null) {
        palpitados.push(partido);
      }
    }

    console.log(palpitados);

    this.http.post(this.url + "/public/mobile/palpitarrodadatoda", { palpites: palpitados, usuario: localStorage.getItem("id") })
      .subscribe(resultado => {
        this.spinnerService.hide();
        if (resultado == 200) {
          this.palpitesRealizados = true;
        } else {
          this.palpitesRealizados = false;
        }
      })
  }

  /**
   * para pintar el campeonato activo
   */
  setCampeonatoActivo() {
    for (let campeonato of this.campeonatos) {
      if (campeonato.ch_id == this.campeonatoActual) {
        campeonato.active = "blue";
      } else {
        campeonato.active = "white";
      }
    }
  }

  comprarRodada() {
    this.spinnerService.show();
    this.http.post(this.backEndService.getBackEnd() + "comprarrodada",
      { usuario: localStorage.getItem("id"), rodada: this.rodadaActual })
      .subscribe(res => {
        console.log(res);
        this.spinnerService.hide();
        if (res['status'] === 200) {          
          window.location.reload();
        } else {
          this.semDinheiro = true;
        }
      });

  }
}