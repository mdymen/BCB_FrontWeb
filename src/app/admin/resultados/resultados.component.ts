import { Component, OnInit } from '@angular/core';
import { CampeonatoService } from '../../services/campeonato.service';
import { PartidoService } from '../../services/partido.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  url;
  partidos;

  constructor(private _campeonatoService: CampeonatoService,
    private _partidoService:PartidoService) {

  }

  ngOnInit() {
    this.search();
  }

  change(url) {
    this.url = url;
  }

  search() {
    this._campeonatoService.loadGlobo("http://globoesporte.globo.com/servico/backstage/esportes_campeonato/esporte/futebol/modalidade/futebol_de_campo/categoria/profissional/campeonato/campeonato-brasileiro/edicao/campeonato-brasileiro-2018/fases/fase-unica-seriea-2018/rodada/12/jogos.html", 24, 220)
      .subscribe((res: any) => {
        this.partidos = res.body;
        console.log(res);
      })
  }

}
