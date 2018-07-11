import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CargarcampeonatoComponent } from '../cargarcampeonato/cargarcampeonato.component';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend.service';
import { Observable } from 'rxjs/Observable';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import 'rxjs/add/operator/map';
import { FormEditarPartidoComponent } from '../componentes/form-editar-partido/form-editar-partido.component';
import { CampeonatoService } from '../../services/campeonato.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
/**
 * El componente es el encargado de establecer 
 * los resultados de los partidos que ya fueron jugados
 */
export class PartidosComponent implements OnInit, AfterViewInit {

  campeonatos = [];
  cargoCampeonato = false;
  partidos = [];
  campeonato: any;
  rodada: any;

  cargoRodada = false;
  rodadas = [];
  resultados = [];

  nomeCampeonato: string;
  nomeRodada: string;

  url = "http://www.dymenstein.com";
  fotos = "http://www.bolaocraquedebola.com.br";

  mostrarModalEditarPartido: boolean = false;
  partidoParaEditar: any;
  @ViewChild(FormEditarPartidoComponent) modalParaEditar;

  constructor(private http: HttpClient,
    private backend: BackendService,
    private campeonatoService: CampeonatoService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    //carga todos los campeonatos disponibles
    this.spinnerService.show();
    this.campeonatoService.getCampeonatos().subscribe(result => {
      this.campeonatos = result as any[];
      this.spinnerService.hide();
    });
  }

  /**
   * Cuando el usuario selecciona el campeonato para poner los resultados
   */
  seleccionarCampeonato(campeonato) {
    this.campeonato = campeonato;
    this.nomeCampeonato = this.campeonatos.filter(camp => { return camp.ch_id == campeonato })
      .map(champ => { return champ.ch_nome })[0];

    this.spinnerService.show();
    this.http.post(this.backend.getBackEndAdmin() + "resultados/cargarpartidos?", { champ: campeonato })
      .subscribe(result => {
        result['rounds'].map(round => { this.rodadas.push(round); });
        this.cargoCampeonato = true;
        this.spinnerService.hide();
      })
  }

  /**
   * Cuando el administrador selecciona la rodada para traer los partidos para 
   * poner los resultados
   * @param rodada
   */
  seleccionarRodada(rodada) {
    this.rodada = rodada;
    this.spinnerService.show();
    this.nomeRodada = this.rodadas.filter(r => { return r.rd_id == rodada })
      .map(r => { return r.rd_round })[0];

    this.http.post(this.backend.getBackEndAdmin() + "resultados/cargarpartidos?",
      { champ: this.campeonato, ronda: rodada })
      .subscribe(result => {
        console.log(result);
        this.cargoRodada = true;
        this.partidos = [];
        result['matchs']
          .map(match => {
            match.ver_usuarios_palpitaron = false;
            this.partidos.push(match);
          }
          );
        this.spinnerService.hide();
      });
  }

  /**
   * Graba los resultados en la base
   * @param partidos 
   */
  grabarResultados(partidos: any) {
    this.spinnerService.show();
    partidos.map(partido => {
      if (partido.mt_goal1 && partido.mt_goal2 && partido.mt_played == 0) {
        this.resultados.push(new Resultado(
          partido.mt_id,
          partido.mt_goal1,
          partido.mt_goal2,
          partido.mt_idteam1,
          partido.mt_idteam2,
          partido.ch_id,
          partido.mt_played
        ));
      }
    });
    this.http.post(this.backend.getBackEndAdmin() + "resultados/grabarresultados?",
      { results: this.resultados })
      .subscribe(result => {
        console.log(result);
        this.seleccionarRodada(partidos[0].rd_id);
      })
  }

  /**
   * Devuelve la lista de usuarios que palpitaron el partido @param idmatch
   */
  verusuariospalpitaron(idmatch: Number, partido: any) {
    this.spinnerService.show();
    console.log(partido);
    this.http.post(this.backend.getBackEndAdmin() + "mail/palpitaronpartido", { mt_id: idmatch })
      .subscribe(result => {
        partido.palpites = result;
        partido.ver_usuarios_palpitaron = true;
        console.log(partido);
        this.spinnerService.hide();
      })
  }

  /**
   * Envia email a los que palpitaron el partido
   * @param palpites los palpites que el partido tuvo
   */
  emailParaPalpitadores(idmatch: Number) {
    this.spinnerService.show();
    this.http.post(this.backend.getBackEndAdmin() + "mail/emailparapalpitadores", { mt_id: idmatch })
      .subscribe(result => {
        this.spinnerService.hide();
        console.log(result);
      })
  }

  /**
   * Envia el HTML a los usuarios que tienen configurado para recibir
   */
  enviarHTML() {
    console.log("champ " + this.campeonato + " rodada" + this.rodada);
    this.http.post(this.backend.getBackEndAdmin() + "index/emailrodada",
      { champ: this.campeonato, rodada: this.rodada })
      .subscribe(result => console.log(result));
  }

  /**
   * Abre un modal para editar la informacion del partido
   */
  editar(partido) {
    console.log(partido);
    let rodadaAtual = {
      rd_round:partido.rd_round,
      rd_id:partido.rd_id
    };
    this.http.post(this.backend.getBackEndAdmin() + "index/adicionarpartido?", { champ: this.campeonato })
      .subscribe(result => {

        let auxiliarRodadas = result['rondas'];
        for (let rodada of auxiliarRodadas) {
          let r = {
            rd_round:rodada.rd_round,
            rd_id:rodada.rd_id
          }
          this.modalParaEditar.rodadas.push(r);
        }

        result['teams'].map(team => {
          this.modalParaEditar.equipos1.push(team);
          this.modalParaEditar.equipos2.push(team);
        })
        this.modalParaEditar.partido = partido;
        this.modalParaEditar.rodada = rodadaAtual;
        this.modalParaEditar.mostrarModal = true;

        console.log(this.modalParaEditar.rodada);
      })
  }

  ngAfterViewInit() {
    this.modalParaEditar.rodada = this.rodada;
    this.modalParaEditar.mostrarModal = false;
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