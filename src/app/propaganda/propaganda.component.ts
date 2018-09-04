import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidoService } from '../services/partido.service';
import { Global } from '../config/global.service';

@Component({
  selector: 'app-propaganda',
  templateUrl: './propaganda.component.html',
  styleUrls: ['./propaganda.component.css']
})
export class PropagandaComponent implements OnInit {

  @Input() tipo;
  partidos = [];
  url_img;

  constructor(private route:ActivatedRoute,
    private _partidoService:PartidoService) {
      this.url_img = Global.URL_BOLAO + Global.ASSETS_EQUIPOS;
    }

  ngOnInit() {
  
    if (this.tipo == "resultados_ayer") {
      this._partidoService.getAyer(20)
        .subscribe((res:any) => {
          console.log(res);
          this.partidos = res.body;
        })
    }

  }

}
