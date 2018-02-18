import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  equipos1 = [];
  equipos2 = [];
  rodadas = [];
  cargoCampeonato = false;

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

      let partido = new Partido(null,null,null,null,null);
      this.partidos.push(partido);

  }

  seleccionarCampeonato(campeonato) {
    this.http.post(this.backend.getBackEndAdmin() + "index/adicionarpartido?", {champ:campeonato})
      .subscribe(result => {

        this.cargoCampeonato = true;

        let auxiliarRodadas = result['rondas'];
        for (let rodada of auxiliarRodadas) {
          this.rodadas.push(rodada);
        }

        result['teams'].map(team => {
          this.equipos1.push(team);
          this.equipos2.push(team);
        })

      })
  }


  onSubmitPartidos(partidos) {
    this.http.post(this.backend.getBackEndAdmin() + "index/salvarpartidos", {partidos:this.partidos})
    .subscribe(result => {
      console.log(result);
    })    
  }

  adicionarjogo() {
    console.log("adicionar partido");
    let nuevoPartido = new Partido(null, null, null, null, null);
    this.partidos.push(nuevoPartido);
  }

}


export class Partido {

  constructor(private ronda:number, private date:string, private hora:string, private team1:number, private team2:number) {

  }

}