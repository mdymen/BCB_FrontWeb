import { Component, OnInit } from '@angular/core';
import { PartidoService } from '../services/partido.service';

@Component({
  selector: 'app-postfacebook',
  templateUrl: './postfacebook.component.html',
  styleUrls: ['./postfacebook.component.css']
})
export class PostfacebookComponent implements OnInit {

  resultado = "";

  constructor(private _partidoService:PartidoService) { }

  ngOnInit() {

  }

  serieApartidosHoy() {
    this._partidoService.manualPost("H",24)
      .subscribe((res:any) => {
        console.log(res);
        this.resultado = res;
      });
  }


  serieApartidosAyer() {
    this._partidoService.manualPost("A",24)
      .subscribe((res:any) => {
        console.log(res);
        this.resultado = res;
      });
  }


  serieBpartidosHoy() {
    this._partidoService.manualPost("H",27)
      .subscribe((res:any) => {
        console.log(res);
        this.resultado = res;
      });
  }


  serieBpartidosAyer() {
    this._partidoService.manualPost("A",27)
      .subscribe((res:any) => {
        console.log(res);
        this.resultado = res;
      });
  }

}
