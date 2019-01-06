import { Component, OnInit } from '@angular/core';
import { CampeonatoService } from '../../services/campeonato.service';
import { PartidoService } from '../../services/partido.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Global } from '../../config/global.service';
import { RodadaService } from '../../services/rodada.service';
import { FormGroup, FormControl } from '@angular/forms';

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

  url_img;

  rodadaForm: FormGroup;

  constructor(private _campeonatoService: CampeonatoService,
    private _partidoService: PartidoService,
    private _rodadaService: RodadaService,
    private spinner: Ng4LoadingSpinnerService) {

    this.url_img = Global.URL_BOLAO + Global.ASSETS_EQUIPOS;
  }

  ngOnInit() {
    this.rodada = new FormGroup({
      rd_idchampionship: new FormControl(),
      rd_round: new FormControl(),
      rd_suma: new FormControl(),
      rd_cambio: new FormControl(),
    });

    this.loadCampeonatos();
  }

  search() {
    this.spinner.show();
    this._campeonatoService.loadGlobo(this.rodada, this.campeonato)
      .subscribe((res: any) => {
        this.partidos = res.body;
        console.log("resultados", res);
        this.partidos.map(
          partido => {
            partido.equipo1[0].selected = true;
            partido.equipo2[0].selected = true;
          }
        )
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

  ver() {
    console.log(this.partidos);
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
        let equipo1 = partido.equipo1.
          filter(equipo => {
            if (equipo.selected) {
              return equipo;
            }
          });
        let equipo2 = partido.equipo2.filter
          (equipo => {
            if (equipo.selected) {
              return equipo;
            }
          });

        return {
          mt_id: partido.mt_id ? partido.mt_id : null,
          mt_goal1: partido.mt_goal1,
          mt_goal2: partido.mt_goal2,
          mt_idteam1: equipo1[0].mt_idteam1,
          mt_idteam2: equipo2[0].mt_idteam2,
          mt_idchampionship: partido.mt_idchampionship,
          mt_played: partido.mt_played,
          mt_date: partido.mt_date,
          mt_idround: partido.mt_idround,
          played: partido.played,
        }
      }
    )

    return partidos;

  }


  crearRodada(rd_idchampionship, rd_round, rd_suma, rd_cambio) {
    this.spinner.show();
    this._rodadaService.post(rd_idchampionship, rd_round, rd_suma, rd_cambio)
      .subscribe(result => {
        console.log(result);
        this.spinner.hide();
      }, erro => {
        alert("error");
        this.spinner.hide();
        console.log(erro);
      });
  }


}
