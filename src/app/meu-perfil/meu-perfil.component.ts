import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendService } from '../backend.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { Partido } from '../partido';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
//import { LocalStorageService } from '../services/local-storage.service';


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

  foto:string;

  partidos = false;

  limit:Number = 9;
  proximo:Number = 9;

  usuarioObj = null;

  grito = "";
  equipo = "";

  usuarioCargado = false;

  constructor(private backend: BackendService, private http: HttpClient,
    private sanitazer: DomSanitizer,
    private route:ActivatedRoute, 
    private spinnerService:Ng4LoadingSpinnerService,
    private _usuarioService:UsuarioService) {

      this.route.params.subscribe(params => {
        if (params['limit']) {
          this.limit = params['limit'];
          this.proximo = parseInt(params['limit']) + 9;          
        }

        if (params['usuario']) {
          this.idUsuario = params['usuario'];
        } else {
          this.resRodadaPalpite = Number.parseInt(localStorage.getItem("res_rod_pal")) === 0 ? false : true;
          this.resPalpite = Number.parseInt(localStorage.getItem("res_pal")) == 0 ? false : true;
          this.infoRodadaGeral = Number.parseInt(localStorage.getItem("info_rod")) == 0 ? false : true;
          this.usuario = localStorage.getItem("username");
          this.idUsuario = localStorage.getItem("id");
          this.cash = localStorage.getItem("cash");            
        }
      })

      this._usuarioService.getPalpites(this.idUsuario, this.limit)
        .subscribe((res:any) => {
          this.partidos = res.body;
        });

    this.http.post(this.backend.getBackEndNormal() + "/usuario/usuario", {usuario:this.idUsuario})
    .subscribe(result => {
      this.usuarioObj = result;
      this.usuario = this.usuarioObj.us_username;
      if (this.usuarioObj.us_grito) {
        this.grito = this.usuarioObj.us_grito;
      }
      if (this.usuarioObj.us_teamname) {
        this.equipo = this.usuarioObj.us_teamname;
      }

      this.acertos = this.usuarioObj.palpites.acertos;
      this.erros = this.usuarioObj.palpites.erros;
      this.palpitados = this.usuarioObj.palpites.palpitados;
      this.pontos = this.usuarioObj.palpites.pontos;

      this.usuarioCargado = true;

      this.foto = "http://dymenstein.com/public/assets/img/perfil/" + this.usuarioObj.foto;

      console.log(result);
    });
  }

  ngOnInit() {
  }

  /**
   * Devuelve true si el resultado palpitado fue acertado
   * @param partido 
   */
  verificarSuceso(partido: Partido) {
    return partido.mt_goal1 === partido.rs_res1 && partido.mt_goal2 === partido.rs_res2;
  }

  /**
   * Transferencia de la foto
   * @param files 
   */
  handleFileInput(files: FileList) {

    this.fileToUpload = files.item(0);

    const formData: FormData = new FormData();
    formData.append('imgPerfil', this.fileToUpload, this.fileToUpload.name);
    formData.append('id', localStorage.getItem('id'));

    let hs = new HttpHeaders({'enctype': 'multipart/form-data'});
    var options =  {
      headers: hs
    };


    this.http.post(this.backend.getBackEndNormal() + "usuario/uploadimage", formData, options)
      .subscribe(res => {        
        localStorage.setItem("foto", res['foto']); 
        this.foto = "http://dymenstein.com/public/assets/img/perfil/" + localStorage.getItem("foto");
        window.location.reload();
      });
  }

  /**
   * Verifica si el usuario que está logado en este momento es el mismo usuario
   * al cual se accedio para ver el perfil
   */
  isUsuarioLogado():boolean {
    return localStorage.getItem("id") === this.idUsuario;
  }
  
  /**
   * Cuando el usuario no tiene foto carga la foto padron
   * @param  
   */
  notExistImage($event) {
    this.foto = "http://dymenstein.com/public/assets/img/perfil/user.png";
  }



    /**
 * Guarda la informacion del usuario correspondiente al recibimiento de emails
 * @param params tiene @param res_pal, @param res_rod_pal, @param info_rod_pal
 * @param iduser
 */
/*  salvarConfiguracionEmail() {

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

        console.log(result);
      },
        error => { })



  }*/


    /**
   * Informacion estadisticamente de los palpites de un usuario
   */
 /* palpites() {
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
  }*/
}
