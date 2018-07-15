import { Component, OnInit } from '@angular/core';
import { CampeonatoService } from '../../services/campeonato.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  url;

  constructor(private _campeonatoService:CampeonatoService) { 

  }

  ngOnInit() {
  }

  change(url) {
    this.url = url;
  }

  search() {
    this._campeonatoService.loadGlobo(this.url)
      .subscribe((res:any) => {
        console.log(res);
      })
  }

}
