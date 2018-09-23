import { Component, OnInit, Input } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';
import { Ranking } from '../ranking';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { RodadaService } from '../services/rodada.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  campeonato;
  vertabla = "display:none";
  rankings = [];
  rankingCargado: boolean = false;
  cargando = false;

  @Input("rodada") idRodada;

  constructor(private http: HttpClient,
    private backend: BackendService,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private _rodadaService: RodadaService) { }

  ngOnInit() {
  }


  cargarTabla() {

    this.cargando = true;
    this._rodadaService.ranking(this.idRodada)
      .subscribe((res: any) => {
        console.log(res);
        this.rankingCargado = true;
        this.rankings = res.body;
      })
  };

}
