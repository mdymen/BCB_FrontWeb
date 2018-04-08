import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';
import { ActivatedRoute } from '@angular/router';
import { Grupo } from '../grupo';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Equipo } from '../equipo';

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

  constructor(private http: HttpClient,
    private backend: BackendService,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {


  }

  cargarTabla() {
    if (this.vertabla == "display:none") {
      this.route.params.subscribe(params => {


        this.campeonato = params['campeonato'];
        this.spinnerService.show();
        this.http.post(this.backend.getBackEnd() + "/equipos", { champ: this.campeonato })
          .subscribe(result => {

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
    }
  }

}
