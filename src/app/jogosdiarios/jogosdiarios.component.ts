import { Component, OnInit } from '@angular/core';
import { PartidoService } from '../services/partido.service';
import { Global } from '../config/global.service';
import { ActivatedRoute } from '@angular/router';
import { FechaService } from '../fecha.service';

@Component({
  selector: 'app-jogosdiarios',
  templateUrl: './jogosdiarios.component.html',
  styleUrls: ['./jogosdiarios.component.css']
})
export class JogosdiariosComponent implements OnInit {

  partidos = [];
  url_img;
  fecha;

  constructor(private _partidoService: PartidoService,
    private route: ActivatedRoute,
    private _fechaService: FechaService) {
    this.url_img = Global.URL_BOLAO + Global.ASSETS_EQUIPOS;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.fecha = params['date'];

      this._partidoService.getPartidosByDate(params['date'])
        .subscribe((res: any) => {
          this.partidos = res.body;
          console.log(this.partidos);
          this.setDisabled(this.partidos);
        })

    })
  }

  setDisabled(partidos) {
    partidos.map(partido => {
      console.log(this._fechaService.puedePalpitar(partido.mt_date));
      partido.disabled = this._fechaService.puedePalpitar(partido.mt_date) && partido.rd_custo == null; 
    });
  }

    /**
   * Crea o actualiza todos los palpites de la rodada this.rodadaActual 
   * y del campeonato this.campeonatoActual
   * @param partidos todos los partidos con los palpites realizados
   */
 /* logForm(partidos: any) {
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
  }*/

}
