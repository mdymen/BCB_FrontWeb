import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent {
  listaOpciones: Opciones[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

    let o1 = new Opciones("Home","fa fa-home", "/");
    this.listaOpciones.push(o1);
  }

}

export class Opciones {
  nombre:string;
  icono:string;
  link:string;

  constructor(private n:string, private i:string, private l:string) {
    this.nombre = n;
    this.icono = i;
    this.link = l;
  }
}
