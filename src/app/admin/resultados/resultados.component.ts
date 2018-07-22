import { Component, OnInit } from '@angular/core';
import { CampeonatoService } from '../../services/campeonato.service';
import { PartidoService } from '../../services/partido.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Global } from '../../config/global.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  url;
  partidos;

  campeonatos;
  rodadas;

  campeonato;
  rodada;
  cambio;

  url_img;

  constructor(private _campeonatoService: CampeonatoService,
    private _partidoService: PartidoService,
    private spinner: Ng4LoadingSpinnerService) {

    this.url_img = Global.URL_BOLAO + Global.ASSETS_EQUIPOS;
  }

  ngOnInit() {
    this.loadCampeonatos();
  }

  search() {
    this.spinner.show();
    this._campeonatoService.loadGlobo(this.cambio, this.campeonato, this.rodada)
      .subscribe((res: any) => {
        this.partidos = res.body;
        this.spinner.hide();
        console.log(res);
      })
  }

  /**
   * Al seleccionar un campeonato retorna todas las rodadas del campeonato
   * @param idCampeonato 
   */
  loadRodadas(idCampeonato) {
    this.spinner.show();
    this._campeonatoService.loadRodadasByCampeonato(idCampeonato)
      .subscribe((res: any) => {
        this.campeonato = idCampeonato;
        this.rodadas = res.body;
        this.spinner.hide();
      })
  }

  /**
   * Carga todos los campeonatos activos disponibles
   */
  loadCampeonatos() {
    this.spinner.show();
    this._campeonatoService.getCampeonatos()
      .subscribe((res: any) => {
        this.campeonatos = res;
        this.spinner.hide();
      })
  }

  setRodada(idRodada) {
    this.rodada = idRodada;
  }

  save() {
    let partidos = this.setPartidos();
    console.log(partidos);

    this.spinner.show();
    this._partidoService.save(partidos)
      .subscribe((res: any) => {
        console.log(res);
        this.spinner.hide();
      })
  }

  setPartidos() {
    let partidos = this.partidos.map(
      partido => {
        return {
          mt_id: partido.mt_id ? partido.mt_id : null,
          mt_goal1: partido.mt_goal1,
          mt_goal2: partido.mt_goal2,
          mt_idteam1: partido.mt_idteam1,
          mt_idteam2: partido.mt_idteam2,
          mt_idchampionship: partido.mt_idchampionship,
          mt_played: partido.mt_played,
          mt_date: partido.mt_date,
          mt_idround: partido.mt_idround,
          played:partido.played,
        }
      }
    )

    return partidos;

  }

}
