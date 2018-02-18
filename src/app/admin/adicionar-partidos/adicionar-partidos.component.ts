import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
//import { CampeonatoService } from '../../entidades/campeonato.service';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend.service';

@Component({
  selector: 'app-adicionar-partidos',
  templateUrl: './adicionar-partidos.component.html',
  styleUrls: ['./adicionar-partidos.component.css']
})
export class AdicionarPartidosComponent implements OnInit {

  partidos = [];
  campeonatos = [];
  equipo1 = [];
  equipo2 = [];
  rodadas = [];

  constructor(private http: HttpClient, private backend: BackendService) { }

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
    console.log(campeonato);
    this.http.post(this.backend.getBackEndAdmin() + "index/adicionarpartido?", {champ:campeonato})
      .subscribe(result => {
        console.log(result);
      })
  }





}
