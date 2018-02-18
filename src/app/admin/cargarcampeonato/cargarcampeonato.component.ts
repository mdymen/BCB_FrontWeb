import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend.service';

@Component({ 
  selector: 'app-cargarcampeonato',
  templateUrl: './cargarcampeonato.component.html',
  styleUrls: ['./cargarcampeonato.component.css']
})
export class CargarcampeonatoComponent implements OnInit {

  campeonatos = [];
  campeonato: any;

  constructor(private http: HttpClient, private backend:BackendService) { }

  ngOnInit() {
        //carga todos los campeonatos disponibles
        this.http.post(this.backend.getBackEnd() + "cellgetcampeonatosabertos/?", {})
        .subscribe(result => {
          let aux = JSON.stringify(result);
          let campeonatos = JSON.parse(aux);
  
          for (let campeonato of campeonatos) {
            this.campeonatos.push(campeonato);
          }
          
        });
  }

  seleccionarCampeonato(campeonato) {
    this.campeonato = campeonato;
  }

}
