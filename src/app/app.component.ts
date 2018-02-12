import { Component } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
//import {Globals} from '../globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
 
  menu: Opciones[] = [];

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {
    this.menu.push(new Opciones("Home","fa fa-home", "/palpitarrodada"));
    this.menu.push(new Opciones("Caixa","fa fa-dollar", "/caixa"));

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