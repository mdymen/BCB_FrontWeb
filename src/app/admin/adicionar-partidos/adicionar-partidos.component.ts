import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PartidosService } from '../services/partidos.services';
import { CampeonatoService } from '../../services/campeonato.service';

@Component({
  selector: 'app-adicionar-partidos',
  templateUrl: './adicionar-partidos.component.html',
  styleUrls: ['./adicionar-partidos.component.css']
})
export class AdicionarPartidosComponent implements OnInit {

  partidos = [];
  campeonatos = [];
  equipos1 = [];
  equipos2 = [];
  rodadas = [];
  campeonato: any;

  rodada;
  cambio;

  constructor(private http: HttpClient, private backend: BackendService,
    private spinner: Ng4LoadingSpinnerService,
    private _campeonatoService: CampeonatoService,
    private _partidoService: PartidosService) { }

  ngOnInit() {

    this.load();
  }

  /**
   * Carga todos los campeonatos activos
   */
  load() {
    this.spinner.show();

    this._campeonatoService.load()
      .subscribe((res:any) => {
        this.campeonatos = res.body;
        this.spinner.hide();
      });
  }

  
  /**
   * Carga los equipos y rodadas disponibles
   * del campeonato seleccionado
   * @param campeonato 
   */
  changeCampeonato(campeonato) {
    this.spinner.show();
    this.campeonato = campeonato;

    this._campeonatoService.loadByCampeonato(this.campeonato)
      .subscribe((res:any) => {

        this.collectEquipes(res.body);
        this.add();
        this.loadRodadas(this.campeonato);

        this.spinner.hide();
      });
  }

  /**
   * Carga todas las rodadas del campeonato especificado
   * @param campeonato 
   */
  loadRodadas(campeonato) {
    this.campeonato = campeonato;
    this._campeonatoService.loadRodadasByCampeonato(campeonato)
      .subscribe((res:any) => {
        this.rodadas = res.body;
      });
  }

  /**
   * Graba los partidos
   * @param partidos 
   */
  onSubmit(partidos) {
    this.spinner.show();
    let toSave = {
      partidos : this.partidos
    }

    this._partidoService.save(toSave)
      .subscribe((res:any) => {
        console.log(res);
        this.spinner.hide();
      });
  }

  /**
   * Registra los equipos del campeonato seleccionado en la listas 
   * para ser seleccionados para cadastrar un nuevo partido
   * @param equipes 
   */
  collectEquipes(equipes) {
    this.equipos1 = equipes;
    this.equipos2 = equipes;
  }

  /**
   * Adiciona un nuevo partido disponible para completar en el campeonato
   * y la rodada seleccionada
   */
  add() {
    let jogo = {
      date: "",
      hora: "",
      team1: 0,
      team2: 0,
      champ: this.campeonato
    }

    this.partidos.push(jogo);
  }

  search() {
    this.spinner.show();
    console.log("campeonato", this.campeonato);
    this._campeonatoService.loadGlobo(this.cambio, this.campeonato, this.rodada, true)
      .subscribe((res: any) => {
        this.partidos = res.body;
        this.spinner.hide();
        console.log(res);
      })
  }

  setRodada(idRodada) {
    this.rodada = idRodada;
  }

  save() {
    this.spinner.show();
    console.log(this.partidos);
    this._partidoService.save(this.partidos) 
      .subscribe((res:any) => {
        console.log(res);
        this.spinner.hide();
      })
  }
}