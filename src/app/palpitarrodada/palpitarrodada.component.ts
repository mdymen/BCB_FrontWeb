import { Component, OnInit, Input } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Partido } from '../partido';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FechaService } from '../fecha.service';
import { BackendService } from '../backend.service';
import { Location } from '@angular/common';
import { CampeonatoService } from '../services/campeonato.service';
import { Global } from '../config/global.service';
import { PartidoService } from '../services/partido.service';
import { Campeonatos } from '../config/campeonatos';
import { UnloggedService } from '../services/unlogged.service';

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
  campeonatoActual = null;
  palpitesRealizados = false;

  //para almazenar el id de la rodada actual para setear
  //la classs active
  rodadaActual = 0;

  //indica si ya fue seleccionado un campeonato y cargado. 
  //sirve para mostrar el HTML en la pantalla;
  cargoCampeonato = false;

  //toda la informacion de la rodada marcada
  rodadaActualObjeto: any;

  //si intenta comprar una rodada y no tiene guita suficiente
  //esta variable es usada para mostrar el mensaje de error.
  semDinheiro:boolean = false;

  palpitando:boolean = false;

  url_img;

  proximosPartidos = [];
  proximosPartidosTitulos = [];
  proximosPartidosFechas = [];

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private fechaService: FechaService,
    private backEndService: BackendService,
    private _campeonatoService: CampeonatoService,
    private _partidoService:PartidoService,
    private _unloggedService:UnloggedService,
    private location: Location) {
      this.url_img = Global.URL_BOLAO + Global.ASSETS_EQUIPOS;

  }

  ngOnInit() {

    console.log("paso por acá");

    this._partidoService.getByCampeonatoAndDate(24)
      .subscribe((res:any) => {
        console.log("partidos hoy",res);
      }, error => {
        console.log(error);
      })


    //carga los dados del campeonato en funcion de los parametros de la url
    this.route.params.subscribe(params => {

      console.log("params", params);

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
      console.log(params['campeonato']);
      if (params['campeonato']) {
        this.campeonatoActual = params['campeonato'];
        console.log("if", params['campeonato']);
        this.onChange();
      } else {
        this.campeonatoActual = null;
      }

    });

   /* this._campeonatoService.getBasico()
      .subscribe((res:any) => {
        this.campeonatos = res.body;
        this.spinnerService.hide();
      });
*/

this.campeonatos = Campeonatos.Campeonatos;

      console.log("selected", this.isSelected());
      if (this.isSelected()) {
        this.getPartidosRecientes();

        this._unloggedService.ultimosJugados()
          .subscribe((res:any) => {
            console.log(res);
          })
      }
  }

  /**
   * carga todo lo necesario para realizar los palpites del campeonato y de la rodada
   */
  public onChange(): void {

    this._campeonatoService.loadRodadaPalpitada(this.campeonatoActual, this.rodadaActual)
      .subscribe((res:any) => {
        console.log("novo", res);
        this.campeonatoActualObjeto = res.body.championship;
        this.cargoCampeonato = true;
        this.rodadaActual = res.body.n_rodada;
        this.rodadas = res.body.rondas;
        this.partidos = res.body.rodada;
        this.rodadaActualObjeto = res.body.rodadaAtual[0];
        this.rodadaActualObjeto.active = "active";
        this.setJogos(this.partidos);

        for (let rodada of this.rodadas) {
          if (rodada.rd_id == this.rodadaActual) {
            rodada.active = "active";
          }
        }

      });
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
   * @param partidos todos los partidos con los palpites realizados
   */
  logForm(partidos: any) {
    this.palpitando = true;
    this.spinnerService.show();
    let palpitados = partidos.filter(partido => {
      if (partido.rs_res1 !== null && partido.rs_res2 !== null) {
        return partido;
      }
    })

    this.http.post(this.url + "/public/mobile/palpitarrodadatoda", { palpites: palpitados, usuario: localStorage.getItem("id") })
      .subscribe(resultado => {
        this.spinnerService.hide();
        if (resultado == 200) {
          this.palpitesRealizados = true;
        } else {
          this.palpitesRealizados = false;
        }
        this.palpitando = false;
      })
  }

  comprar() {
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

  setJogos(partidos) {
    partidos.map(partido => {
      partido.disabled = this.fechaService.puedePalpitar(partido.mt_date); 
      partido.acerto = this.verificarResultadoPalpitado(partido);
    });
  }

  /**
   * retorna true si la rodada tiene algun costo 
   */ 
  rodadaPay() : boolean {
    console.log("rodada actual", this.rodadaActualObjeto);
    return this.rodadaActualObjeto.rd_custo && this.rodadaActualObjeto.rd_custo > 0;
  }

  /**
   * retorna true si la rodada fue paga
   */
  paid() : boolean {
    console.log("paga",this.rodadaActualObjeto.ru_pago);
    return this.rodadaActualObjeto.ru_pago === "1";
  }

  isSelected() {
    console.log(this.campeonatoActual === null);
    return this.campeonatoActual === null;
  }

  /**
   * Retorna una lista de partidos de hoy, maniana y ayer.
   */
  getPartidosRecientes() {
    this._partidoService.getPartidosRecientes()
      .subscribe((res:any)=> {
        console.log(res);
        this.proximosPartidos.push(res.body.ayer);
        this.proximosPartidos.push(res.body.hoy);
        this.proximosPartidos.push(res.body.maniana);

        this.proximosPartidosTitulos[0] = "Ontem";
        this.proximosPartidosTitulos[1] = "Hoje";
        this.proximosPartidosTitulos[2] = "Amanha";

        console.log(this.proximosPartidos);

        this.proximosPartidosFechas[0] = res.body.dataayer;
        this.proximosPartidosFechas[1] = res.body.datahoy;
        this.proximosPartidosFechas[2] = res.body.datamaniana;

      })
  }
}