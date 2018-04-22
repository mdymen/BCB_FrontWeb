import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendService } from '../backend.service';
import { HttpClient } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit {

  resRodadaPalpite: boolean;
  resPalpite: boolean;
  infoRodadaGeral: boolean;
  usuario: string;
  cash: string;

  emailForm: FormGroup;

  tabPalpitesCargado = false;

  erros;
  acertos;
  palpitados;
  pontos;

  cargoInfoPalpites = false;

  constructor(private backend: BackendService, private http: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService) {
    this.resRodadaPalpite = Number.parseInt(localStorage.getItem("res_rod_pal")) === 0 ? false : true;
    this.resPalpite = Number.parseInt(localStorage.getItem("res_pal")) == 0 ? false : true;
    this.infoRodadaGeral = Number.parseInt(localStorage.getItem("info_rod")) == 0 ? false : true;
    this.usuario = localStorage.getItem("username");
    this.cash = localStorage.getItem("cash");
  }

  ngOnInit() {
  }

  /**
 * Guarda la informacion del usuario correspondiente al recibimiento de emails
 * @param params tiene @param res_pal, @param res_rod_pal, @param info_rod_pal
 * @param iduser
 */
  salvarConfiguracionEmail() {

    this.spinnerService.show();
    this.http.post(this.backend.getBackEndNormal() + "usuario/emailconfiguracion",
      {
        res_pal: this.resPalpite,
        res_rod_pal: this.resRodadaPalpite,
        info_rod: this.infoRodadaGeral,
        iduser: localStorage.getItem("id")
      })
      .subscribe(result => {
        localStorage.setItem("res_rod_pal", Number(this.resRodadaPalpite).toString());
        localStorage.setItem("res_pal", Number(this.resRodadaPalpite).toString());
        localStorage.setItem("info_rod", Number(this.resRodadaPalpite).toString());

        this.spinnerService.hide();
        console.log(result);
      },
        error => { console.log(error); this.spinnerService.hide() })



  }

  palpites() {
    if (!this.cargoInfoPalpites) {
      this.spinnerService.show();
      this.http.post(this.backend.getBackEndNormal() + "usuario/infopalpitesusuario",
        { usuario: localStorage.getItem("id") })
        .subscribe(res => {
          console.log(res);
          this.spinnerService.hide();
          this.erros = res['erros'],
          this.acertos = res['acertos'],
          this.palpitados = res['palpitados'],
          this.pontos = res['pontos']
          this.cargoInfoPalpites = true;
        })
    }
  }
}
