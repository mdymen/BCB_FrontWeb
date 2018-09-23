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
  idPost = 0;

  constructor(private _partidoService:PartidoService) { }

  ngOnInit() {
    let date = new Date().toString();


    Observable.interval(32000000)
      .subscribe(()=> {
        this._partidoService.getPosterior(this.idPost)
          .subscribe((res:any) => {
            this.idPost = res.body.ps_id;
            console.log(res);

            let post = {
              ps_id : res.body.ps_id,
              ps_tag : res.body.ps_tag,
              ps_titulo : res.body.ps_titulo,
              ps_descripcion : res.body.ps_descripcion,              
            }

            console.log(post);

            this.resultados = date + ":" + post.ps_id + " - " + post.ps_tag + " - " + post.ps_descripcion + " - " + post.ps_titulo;
          })
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
