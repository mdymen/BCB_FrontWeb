import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, SocialUser } from "angularx-social-login";
import { PartidoService } from './services/partido.service';
import { Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logado = false;
  menu = [];
  usuario;
  cash;
  foto;
  privacidade = false;
  partidos = [];
  paraTirarFotoPropaganda = false;
  tipoFotoParaTirar = "";
  campeonatoDoTipo;


  url;
  type;
  description;
  image;

  propaganda = false;

  constructor(private route: Router,
    private authService: AuthService,
    private routes:ActivatedRoute,
    private _partidoService:PartidoService){

    var usuario = localStorage.getItem("username");
    if (usuario) {
      this.logado = true;
      this.usuario = usuario;
      this.cash = localStorage.getItem("cash");
    }

    if (window.location.pathname.toString() == "/privacidade/1") {
      this.privacidade = true;
    }

    if (window.location.href.indexOf("propaganda") > -1) {
      this.paraTirarFotoPropaganda = true;
      let pathname = window.location.pathname.split("/");
      this.campeonatoDoTipo = pathname[pathname.length - 2];
      this.tipoFotoParaTirar = pathname[pathname.length - 3];
    }



  }

  ngOnInit(): void {

    this.foto = "http://dymenstein.com/public/assets/img/perfil/" + localStorage.getItem("foto");

    this.menu.push(new Opciones("Inicio", "fa fa-home", "/palpitarrodada"));
    this.menu.push(new Opciones("Perfil", "fa fa-user", "/meuperfil"));
    this.menu.push(new Opciones("Caixa", "fa fa-dollar", "/caixa"));

    let admin = localStorage.getItem("username");

    if (admin == "m") {
      this.menu.push(new Opciones("Admin Inicio", "fa fa-home", "/admininicio"));
      this.menu.push(new Opciones("Adicionar Campeonato", "fa fa-home", "/adicionarcampeonato"));
      this.menu.push(new Opciones("Add Equipos", "fa fa-male", "/adicionarequipos"));
      this.menu.push(new Opciones("Equipo Campeonato", "fa fa-users", "/equipocampeonato"));
      this.menu.push(new Opciones("Adicionar Partidos", "fa fa-home", "/adicionarpartidos"));
      this.menu.push(new Opciones("Resultados", "fa fa-user", "/resultados"));
      this.menu.push(new Opciones("Setear Rodada", "fa fa-user", "/setrodada"));
      this.menu.push(new Opciones("Post facebook", "fa fa-user", "/postfacebook"));

    }
    this.menu.push(new Opciones("Logout", "fa fa-power-off", "/logout"));
  }

  logout() {
    localStorage.clear();
    location.reload();
    this.authService.signOut();
  }

  notExistImage($event) {
    this.foto = "http://dymenstein.com/public/assets/img/perfil/user.png";
  }

}

class Opciones {
  link: string;
  icono: string;
  nombre: string;

  constructor( private n: string, private i: string, private l: string) {
    this.link = l;
    this.icono = i;
    this.nombre = n;
  }
}