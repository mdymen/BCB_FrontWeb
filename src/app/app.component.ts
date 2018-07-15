import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from "angularx-social-login";

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

  constructor(private route: Router,
    private authService: AuthService) {
    var usuario = localStorage.getItem("username");
    if (usuario) {
      this.logado = true;
      this.usuario = usuario;
      this.cash = localStorage.getItem("cash");
    }
  }

  ngOnInit(): void {
    this.foto = "http://dymenstein.com/public/assets/img/perfil/" + localStorage.getItem("foto");

    this.menu.push(new Opciones("Inicio", "fa fa-home", "/palpitarrodada"));
    this.menu.push(new Opciones("Perfil", "fa fa-user", "/meuperfil"));
    this.menu.push(new Opciones("Caixa", "fa fa-dollar", "/caixa"));

    let admin = localStorage.getItem("username");

    if (admin == "m") {
      this.menu.push(new Opciones("Adicionar Campeonato", "fa fa-home", "/adicionarcampeonato"));
      this.menu.push(new Opciones("Adicionar Rodada", "fa fa-home", "/adicionarrodada"));
      this.menu.push(new Opciones("Add Equipos", "fa fa-male", "/adicionarequipos"));
      this.menu.push(new Opciones("Equipo Campeonato", "fa fa-users", "/equipocampeonato"));
      this.menu.push(new Opciones("Adicionar Partidos", "fa fa-home", "/adicionarpartidos"));
      this.menu.push(new Opciones("Resultados", "fa fa-user", "/partidos"));
      this.menu.push(new Opciones("Setear Rodada", "fa fa-user", "/setrodada"));

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