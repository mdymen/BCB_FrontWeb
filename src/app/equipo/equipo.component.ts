import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { EquiposService } from '../services/equipos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  idEquipo;
  equipo;
  partidos;
  campeonatos;

  assets = "/assets/equipos/grande/";
  limit = 3;

  constructor(private spinnerService:Ng4LoadingSpinnerService,
    private _equiposService:EquiposService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.idEquipo = params['equipo'];
    });
   }

  ngOnInit() {
    this._equiposService.get(this.idEquipo)
      .subscribe((res:any) => {
        this.equipo = res.body.equipo;
        this.partidos = res.body.jogos;
        this.campeonatos = res.body.campeonatos;

        console.log(res);
      })
  }

    /**
   * Devuelve true si el resultado palpitado fue acertado
   * @param partido 
   */
  verificarSuceso(partido) {
    return partido.mt_goal1 === partido.rs_res1 && partido.mt_goal2 === partido.rs_res2;
  }

  more() {
    this.spinnerService.show();
    this.limit = this.limit + 6;
    this._equiposService.getPartidos(this.idEquipo, this.limit)
      .subscribe((res:any) => {
        this.spinnerService.hide();
        this.partidos = res.body.jogos;
      })
  }

}
