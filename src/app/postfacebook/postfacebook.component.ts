import { Component, OnInit } from '@angular/core';
import { PartidoService } from '../services/partido.service';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-postfacebook',
  templateUrl: './postfacebook.component.html',
  styleUrls: ['./postfacebook.component.css']
})
export class PostfacebookComponent implements OnInit {

  resultados = "";
  idPost;
  results = [];

  constructor(private _partidoService:PartidoService) { }

  ngOnInit() {
    let date = new Date().toString();


    Observable.interval(1800000)
      .subscribe(()=> {
        this._partidoService.postTexto(this.idPost)
          .subscribe((res:any)=> {
            this.idPost = res.body.id;

           this.results.push(res.body.result);
              
          });
      });

  }

  serieApartidosHoy() {
    this._partidoService.manualPost("H",24)
      .subscribe((res:any) => {
        console.log(res);
        this.resultados = res;
      });
  }


  serieApartidosAyer() {
    this._partidoService.manualPost("A",24)
      .subscribe((res:any) => {
        console.log(res);
        this.resultados = res;
      });
  }


  serieBpartidosHoy() {
    this._partidoService.manualPost("H",27)
      .subscribe((res:any) => {
        console.log(res);
        this.resultados = res;
      });
  }


  serieBpartidosAyer() {
    this._partidoService.manualPost("A",27)
      .subscribe((res:any) => {
        console.log(res);
        this.resultados = res;
      });
  }

  jogosAmanha() {
    this._partidoService.manualPost("M",0)
      .subscribe((res:any) => {
        console.log(res);
        this.resultados = res;
      });    
  }

}
