import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendService } from '../backend.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit/*, AfterViewInit */{

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

  fileToUpload: any;

  idUsuario;
  urlIframe;

  foto:string;

  constructor(private backend: BackendService, private http: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService,
    private sanitazer: DomSanitizer) {

      if (localStorage.getItem("foto")) {
        this.foto = "http://dymenstein.com/public/assets/img/perfil/" + localStorage.getItem("foto");
      } else {
        this.foto = "http://dymenstein.com/public/assets/img/perfil/user.png";
      }

    this.resRodadaPalpite = Number.parseInt(localStorage.getItem("res_rod_pal")) === 0 ? false : true;
    this.resPalpite = Number.parseInt(localStorage.getItem("res_pal")) == 0 ? false : true;
    this.infoRodadaGeral = Number.parseInt(localStorage.getItem("info_rod")) == 0 ? false : true;
    this.usuario = localStorage.getItem("username");
    this.idUsuario = localStorage.getItem("id");
    this.cash = localStorage.getItem("cash");

    console.log("id usuario", this.idUsuario);

    this.urlIframe = this.sanitazer.bypassSecurityTrustResourceUrl("http://www.dymenstein.com/public/usuario/subirfoto?id="+this.idUsuario);

  }

  ngOnInit() {
  }

  /**
 * Guarda la informacion del usuario correspondiente al recibimiento de emails
 * @param params tiene @param res_pal, @param res_rod_pal, @param info_rod_pal
 * @param iduser
 */
  salvarConfiguracionEmail() {

  /*  this.http.post(this.backend.getBackEndNormal() + "usuario/datosperfil", {id:localStorage.getItem("id")})
      .subscribe( result => {

      })
*/
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

  handleFileInput(files: FileList) {

    this.fileToUpload = files.item(0);

    const formData: FormData = new FormData();
    formData.append('imgPerfil', this.fileToUpload, this.fileToUpload.name);
    formData.append('id', localStorage.getItem('id'));

    let hs = new HttpHeaders({'enctype': 'multipart/form-data'});
    var options =  {
      headers: hs
    };

    this.spinnerService.show();
    this.http.post(this.backend.getBackEndNormal() + "usuario/uploadimage", formData, options)
      .subscribe(res => {        
        localStorage.setItem("foto", res['foto']); 
        this.foto = "http://dymenstein.com/public/assets/img/perfil/" + localStorage.getItem("foto");
        window.location.reload();
      });
  }

}
