import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend.service';
import { FechaService } from '../../fecha.service';

@Component({
  selector: 'app-proximos-partidos',
  templateUrl: './proximos-partidos.component.html',
  styleUrls: ['./proximos-partidos.component.css']
})
export class ProximosPartidosComponent implements OnInit {

  partidos = [];
  erro = false;

  constructor(private http:HttpClient, 
    private backend:BackendService,
    private fechaService:FechaService) { }

  ngOnInit() {
    this.proximosJogos();
  }

  proximosJogos() {

    if (localStorage.getItem("id") === null) {
      this.http.post(this.backend.getBackEndNormal() + "/index/proximosjogos", {cantidad:12, idcampeonato:24})
        .subscribe(res => {
          //carga los partidos
          for (let partido of res['body']) {
            let partidoJson = {
              esHoy : false
            }; 
            partidoJson.esHoy = this.esHoy(partido.mt_date) ? true : false;
            this.partidos.push(partidoJson);
          }
        }, error => {
          this.erro = true;
        });
    }
  }

  esHoy(fecha:string):boolean {
    return this.fechaService.esHoy(fecha);
  }


}
