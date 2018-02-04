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
    this.menu.push(new Opciones("Home","fa fa-home", "/"));
    this.menu.push(new Opciones("Meus Palpites","fa fa-globe", "/meuspalpites"));
    this.menu.push(new Opciones("Palpites","fa fa-globe", "/palpites"));
    this.menu.push(new Opciones("Mues Boloes","fa fa-sign-in", "/meusboloes"));
    this.menu.push(new Opciones("Boloes disponivies","fa fa-search", "/boloesdisponiveis"));
    this.menu.push(new Opciones("Criar Bolao","fa fa-money", "/criarbolao"));       
    this.menu.push(new Opciones("Meu Perfil","fa fa-user", "/meuperfil"));
    this.menu.push(new Opciones("Campeonatos","fa fa-star-o", "/campeonatos"));
    this.menu.push(new Opciones("Ranking","fa fa-star-o", "/ranking"));
    this.menu.push(new Opciones("Caixa","fa fa-dollar", "/caixa"));
    this.menu.push(new Opciones("Transacoes","fa fa-dollar", "/transacoes"));
 
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