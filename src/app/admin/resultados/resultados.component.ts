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
    private _partidoService:PartidoService,
    private spinner:Ng4LoadingSpinnerService) {

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
      .subscribe((res:any) => {
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
      .subscribe((res:any) => {        
        this.campeonatos = res;
        this.spinner.hide();
      })
  }

  setRodada(idRodada) {
    this.rodada = idRodada;
  }

}
