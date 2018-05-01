import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';
import { Ranking } from '../ranking';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  campeonato;
  vertabla = "display:none";
  rankings = [];
  rankingCargado:boolean = false;

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
        this.http.post(this.backend.getBackEnd() + "/ranking", { champ: this.campeonato })
          .subscribe(result => {
            this.rankingCargado = true;
            for (let ranking of result['ranking']) {
              let rankingJson = <Ranking>ranking;
              this.rankings.push(rankingJson);
            }

            console.log(result);

            this.vertabla = "display:block";
            this.spinnerService.hide();

          });
      });
    } else {
      this.vertabla = "display:none";
    }
  }

}
