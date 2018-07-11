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

  constructor(private http: HttpClient, private backend: BackendService,
    private spinnerService: Ng4LoadingSpinnerService,
    private _campeonatoService: CampeonatoService,
    private _partidoService: PartidosService) { }

  ngOnInit() {

    this.load();
  }

  /**
   * Carga todos los campeonatos activos
   */
  load() {
    this.spinnerService.show();

    this._campeonatoService.load()
      .subscribe((res:any) => {
        this.campeonatos = res.body;
        this.spinnerService.hide();
      });
  }

  
  /**
   * Carga los equipos y rodadas disponibles
   * del campeonato seleccionado
   * @param campeonato 
   */
  changeCampeonato(campeonato) {
    this.spinnerService.show();
    this.campeonato = campeonato;

    this._campeonatoService.loadByCampeonato(this.campeonato)
      .subscribe((res:any) => {

        this.collectEquipes(res.body);
        this.add();
        this.loadRodadas(this.campeonato);

        this.spinnerService.hide();
      });
  }

  /**
   * Carga todas las rodadas del campeonato especificado
   * @param campeonato 
   */
  loadRodadas(campeonato) {
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
    this.spinnerService.show();
    let toSave = {
      partidos : this.partidos
    }

    this._partidoService.save(toSave)
      .subscribe((res:any) => {
        console.log(res);
        this.spinnerService.hide();
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

}