import { Component, OnInit, Input } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Partido } from '../partido';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FechaService } from '../fecha.service';

@Component({
  selector: 'app-palpitarrodada',
  templateUrl: './palpitarrodada.component.html',
  styleUrls: ['./palpitarrodada.component.css']
})

export class PalpitarrodadaComponent implements OnInit {

  campeonatos = [];
  @Input() partidos = [];
  campeonato;
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

  constructor(private http: HttpClient, 
    private route: ActivatedRoute, 
    private spinnerService: Ng4LoadingSpinnerService,
    private fechaService: FechaService) {

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
      { id: 3, champ: this.campeonatoActual, rodada: this.rodadaActual })
      .subscribe(res => {
        
        console.log(res);

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
    console.log(value);

    this.http.post(this.url + "/public/mobile/palpitarrodadatoda", { palpites: value, usuario: 3 })
      .subscribe(resultado => {
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
}