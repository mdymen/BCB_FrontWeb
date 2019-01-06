import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';
import { ActivatedRoute } from '@angular/router';
import { Grupo } from '../grupo';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Equipo } from '../equipo';
import { EquiposService } from '../services/equipos.service';
import { Global } from '../config/global.service';

@Component({
  selector: 'app-posiciones',
  templateUrl: './posiciones.component.html',
  styleUrls: ['./posiciones.component.css']
})

export class PosicionesComponent implements OnInit {

  campeonato;
  grupos = [];
  vertabla = "display:none";
  equipos = [];
  isGrupos:boolean;
  tablaCargada:boolean = false;
  assets;

  url_img;

  constructor(private http: HttpClient,
    private backend: BackendService,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private _equiposService:EquiposService) {
      
      this.assets = Global.ASSETS_EQUIPOS;
      this.url_img = Global.URL_BOLAO + Global.ASSETS_EQUIPOS;

    }

  ngOnInit() {


  }

  cargarTabla() {
 
      this.route.params.subscribe(params => {
        this.campeonato = params['campeonato'];
        this.spinnerService.show();
        this._equiposService.loadTabla(this.campeonato) 
          .subscribe((res:any) => {

            if (!res.body.teams[0].tem_grupo) {
              this.isGrupos = false;
              this.equipos = res.body.teams;
            } else {
              this.grupos = res.body.teams;
              this.isGrupos = true;
            }            
            this.spinnerService.hide();

          });
      })

}

}
