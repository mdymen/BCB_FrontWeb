import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticias = [];
  cargadas:boolean = false;
  noticia;
  ver:boolean = false;

  constructor(private http:HttpClient, 
    private backEndService: BackendService) { }

  ngOnInit() {
    this.http.get(this.backEndService.getBackEndNormal() + "/index/noticias")
      .subscribe(result => {
        for(let r of result['noticias']) {
          this.noticias.push(r);
        }
        this.cargadas = true;
        console.log(result);
      } 
    );
  }

  verNoticia(noticia) {
    this.noticia = noticia;
    this.ver = true;
  } 

  cerrar() {
    this.ver = false;
  }

}
