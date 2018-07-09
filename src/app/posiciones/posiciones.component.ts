import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';
import { ActivatedRoute } from '@angular/router';
import { Grupo } from '../grupo';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Equipo } from '../equipo';
import { EquiposService } from '../services/equipos.service';

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

  constructor(private http: HttpClient,
    private backend: BackendService,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private _equiposService:EquiposService) { }

  ngOnInit() {


  }

  cargarTabla() {
 
      this.route.params.subscribe(params => {


        this.campeonato = params['campeonato'];
        this.spinnerService.show();
        this._equiposService.loadTabla(this.campeonato) 
          .subscribe((res:any) => {
            this.equipos = res.body.teams;
            console.log(this.equipos);
            this.spinnerService.hide();
          });


   /*     this.spinnerService.show();
        this.http.post(this.backend.getBackEnd() + "/equipos", { champ: this.campeonato })
          .subscribe(result => {
            this.tablaCargada = true;
            if (result['teams'][0].tem_grupo == false) {
              console.log(result);
              result['teams'].map(team => {this.equipos.push(team);});
              this.isGrupos = false;
              console.log(this.equipos);
            } else {
              console.log(result);
              for (let grupo of result['teams']) {
                let grupoJson = new Grupo(grupo['grupo'], grupo['tem_grupo'], grupo['tm_grupo']);
                this.grupos.push(grupoJson);
                this.isGrupos = true;
              }
            }

            this.vertabla = "display:block";
            this.spinnerService.hide();

          });
      });
    } else {
      this.vertabla = "display:none";
    }*/
      })

}

}
