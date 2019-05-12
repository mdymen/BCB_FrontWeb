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
  cargadas: boolean = false;
  noticia;
  ver: boolean = false;

  constructor(private http: HttpClient,
    private backEndService: BackendService) { }

  ngOnInit() {
    if (localStorage.getItem("id") == null) {

      this.http.get(this.backEndService.getBackEndNormal() + "/index/noticias")
        .subscribe(result => {
          this.noticias.push(result['noticias'][0]);
          this.noticias.push(result['noticias'][1]);
          this.noticias.push(result['noticias'][2]);
          this.noticias.push(result['noticias'][3]);
          this.noticias.push(result['noticias'][4]);
          this.noticias.push(result['noticias'][5]);
          this.noticias.push(result['noticias'][6]);
          this.noticias.push(result['noticias'][7]);

          this.cargadas = true;
        });
    }
  }

  verNoticia(noticia) {
    this.noticia = noticia;
    this.ver = true;
  }

  cerrar() {
    this.ver = false;
  }

}
