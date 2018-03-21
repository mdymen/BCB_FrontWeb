import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend.service';
import { CampeonatoService } from '../../entidades/campeonato.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-adicionar-rodada',
  templateUrl: './adicionar-rodada.component.html',
  styleUrls: ['./adicionar-rodada.component.css']
})
export class AdicionarRodadaComponent implements OnInit {

  campeonatos = [];
  rodada: FormGroup;
  

  constructor(private http: HttpClient, 
    private backendService:BackendService,
    private campeonatoService:CampeonatoService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.rodada = new FormGroup({
      rd_idchampionship: new FormControl(),
      rd_round: new FormControl()
    });

      //carga todos los campeonatos disponibles
      this.spinnerService.show();
      this.campeonatoService.getCampeonatos().subscribe(result => {
        this.campeonatos = result as any[];
        this.spinnerService.hide();
      });  
  }

  crearRodada(rd_idchampionship, rd_round) {
    this.spinnerService.show();
    this.http.post(this.backendService.getBackEndAdmin() + "/rodada/salvarrodada", 
    {champ: rd_idchampionship, rodada:rd_round}).subscribe(result => {
      console.log(result);
      this.spinnerService.hide();
    });
  }

}
