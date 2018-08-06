import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormGroup, FormControl } from '@angular/forms';
import { CampeonatoService } from '../../services/campeonato.service';
import { RodadaService } from '../../services/rodada.service';

@Component({
  selector: 'app-adicionar-rodada',
  templateUrl: './adicionar-rodada.component.html',
  styleUrls: ['./adicionar-rodada.component.css']
})
export class AdicionarRodadaComponent implements OnInit {

  campeonatos = [];
  rodada: FormGroup;


  constructor(private http: HttpClient,
    private _rodadaService: RodadaService,
    private campeonatoService: CampeonatoService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.rodada = new FormGroup({
      rd_idchampionship: new FormControl(),
      rd_round: new FormControl(),
      rd_suma: new FormControl(),
    });

    //carga todos los campeonatos disponibles
    this.spinnerService.show();
    this.campeonatoService.getCampeonatos().subscribe(result => {
      this.campeonatos = result as any[];
      this.spinnerService.hide();
    });
  }

  crearRodada(rd_idchampionship, rd_round, rd_suma) {
    this.spinnerService.show();
    this._rodadaService.post(rd_idchampionship, rd_round, rd_suma)
      .subscribe(result => {
        console.log(result);
        this.spinnerService.hide();
      }, erro => {
        alert("error");
        this.spinnerService.hide();
        console.log(erro);
      });
  }

}
