import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend.service';
import { Partido } from '../../admin/adicionar-partidos/adicionar-partidos.component';

@Component({
  selector: 'app-proximos-partidos',
  templateUrl: './proximos-partidos.component.html',
  styleUrls: ['./proximos-partidos.component.css']
})
export class ProximosPartidosComponent implements OnInit {

  partidos = [];
  erro = false;

  constructor(private http:HttpClient, private backend:BackendService) { }

  ngOnInit() {
    this.proximosJogos();
  }

  proximosJogos() {
    this.http.post(this.backend.getBackEndNormal() + "/index/proximosjogos", {cantidad:12, idcampeonato:24})
      .subscribe(res => {
        //carga los partidos
        for (let partido of res['body']) {
          let partidoJson = <Partido>partido;      
          this.partidos.push(partidoJson);
        }
      }, error => {
        this.erro = true;
      });
  }


}
