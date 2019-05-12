import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Partido } from '../partido';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { DatePipe } from '@angular/common';
import { CampeonatoService } from '../services/campeonato.service';
import { Campeonatos } from '../config/campeonatos';
import { UsuarioService } from '../services/usuario.service';
import { UnloggedService } from '../services/unlogged.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  registro: FormGroup;
  mostrarRegistrarse: boolean;
  mostrarLogin: boolean;
  loginIncorrecto = false;
  partidos = [];
  erro = false;
  private user: SocialUser;
  private loggedIn: boolean;
  
  contacto:FormGroup;
  contactoIncorrecto=false;
  enviando = false;
  envioCorrecto = false;

  campeonatos = [];

  privacidade = false;

  constructor(private http: HttpClient,
    private router: Router,
    private backend: BackendService,
    private spinnerService: Ng4LoadingSpinnerService,
    private authService: AuthService,
    private _campeonatoService:CampeonatoService,
    private _usuarioService:UsuarioService,
    private route: ActivatedRoute,
    private _unloggedService: UnloggedService) {
      this.campeonatos = Campeonatos.Campeonatos;
  }

  setPrivacidade() {
    this.privacidade = true;
  }

  /**
   * Crea el formulario de login
   */
  ngOnInit() {

    this.login = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)

    });

    this.registro = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      grito: new FormControl()
    });

    this.contacto = new FormGroup({
      nome : new FormControl('', Validators.required),
      assunto : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      corpo : new FormControl('', Validators.required)
    });
    
    this.mostrarRegistrarse = false;
    this.mostrarLogin = true;

  this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
      
        this.http.post(this.backend.getBackEndNormal() + "/usuariobyfacebookidoremail",
          { idFacebook: this.user.id, email: this.user.email, nome: this.user.name })
          .subscribe(result => {
            this.guardarLocalStorage(result);
          }, error => {
            this.spinnerService.hide();
            this.erro = true;
          });

      }
    });

    //if (this.needUpdate()) {
      this.updatePartidos();
    //}

   // this.getCampeonatos();
  }

  /**
   * verifica la fecha almacenada en el sistema del usuario
   * y si es diferente a la de hoy, verifica si hay partidos 
   * para actualizar.
   */
  needUpdate() {
    return localStorage.getItem("fecha") === null || localStorage.getItem("fecha") !== this.getToday();
  }

  updatePartidos() {
    this._unloggedService.updatePartidos()
      .subscribe((res:any) => {
        console.log(res);
      }, error => {
        console.log(error);
      });
  }

  getToday() {
    let pipe = new DatePipe("pt-BR");
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'shortDate');
    return myFormattedDate;
  }

  /**
   * por ahora sin validar mucho el formulario consigue logarse
   */
  onSubmit() {
    if (this.login.valid) {
      this.loguearse(this.login.value.usuario, this.login.value.password);
    }
  }

  guardarLocalStorage(result) {
    if (result == false) {
      localStorage.setItem("id", null);
      localStorage.setItem("username", null);
      localStorage.setItem("cash", null);
      localStorage.setItem("jsonUsuario", null);
      localStorage.setItem("admin", null);
      localStorage.setItem("res_pal", null);
      localStorage.setItem("res_rod_pal", null);
      localStorage.setItem("info_rod", null);
      localStorage.setItem("img", null);
      localStorage.setItem("email", null);
      this.loginIncorrecto = true;
    } else {
      this.loginIncorrecto = false;
      localStorage.setItem("id", result['us_id']);
      localStorage.setItem("username", result['us_username']);
      localStorage.setItem("email", result['us_email']);
      localStorage.setItem("cash", result['us_cash']);
      localStorage.setItem("admin", result['us_admin']);
      localStorage.setItem("res_pal", result['res_pal']);
      localStorage.setItem("res_rod_pal", result['res_rod_pal']);
      localStorage.setItem("info_rod", result['info_rod']);
      localStorage.setItem("foto", result['us_foto']);
      localStorage.setItem("jsonUsuario", JSON.stringify(result));
    //  this.router.navigate(['/']);
    //  location.reload();
      this.erro = false;
    }
  }

  loguearse(usuario, password) {
    this.spinnerService.show();
    this._usuarioService.login(usuario, password)
      .subscribe((result:any) => {      
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("id", result.data.usuario.us_id);
        localStorage.setItem("username", result.data.usuario.us_username);
        localStorage.setItem("email", result.data.usuario.us_email);
        localStorage.setItem("cash", result.data.usuario.us_cash);
        localStorage.setItem("admin", result.data.usuario.us_admin);
        localStorage.setItem("foto", result.data.usuario.us_foto);
        this.router.navigate(['/']);
        location.reload();
        this.spinnerService.hide();
      }
        , error => {
          this.spinnerService.hide();
          this.erro = true;
        });
  }

  /**
   * Para mostrar el formulario de registro
   */
  cadastrese() {
    this.mostrarRegistrarse = true;
    this.mostrarLogin = false;
    this.loginIncorrecto = false;
    this.erro = false;
    this.login.controls['usuario'].setValue("");
    this.login.controls['password'].setValue("");
  }

  /**
   * Para volver a mostrar el formulario de login y 
   * salir del formulario de registro
   */
  backToLogin() {
    this.mostrarRegistrarse = false;
    this.mostrarLogin = true;
    this.loginIncorrecto = false;
    this.erro = false;
    this.registro.controls['usuario'].setValue("");
    this.registro.controls['password'].setValue("");
    this.registro.controls['email'].setValue("");
    this.registro.controls['grito'].setValue("");
  }

  /**
   * Submete el formulario de registro y luego 
   * se loguea
   */
  onSubmitRegistro() {
    if (this.registro.valid) {
      this.spinnerService.show();
      var form = this.registro.value;

      this.http.post(this.backend.getBackEnd() + "cadastroweb",
        { username: form.usuario, password: form.password, email: form.email, grito: form.grito }).
        subscribe(result => {
          this.spinnerService.hide();
          this.loguearse(form.usuario, form.password);
        },
          error => {
            this.spinnerService.hide();
            this.erro = true;
          })
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
     .then((user) => {
      this.spinnerService.show();
       this.http.post(this.backend.getBackEndNormal() + "usuario/usuariobyfacebookidoremail",
        {email:user.email, idFacebook:user.id, nome: user.name})
          .subscribe(result => {            
            this.spinnerService.hide();
            this.guardarLocalStorage(result);

          }) 
       
     });
  }

  signOut(): void {
    this.authService.signOut();
  }

  getCampeonatos() {
    this._campeonatoService.getBasico()
      .subscribe((res:any) => {
        this.campeonatos = res.body;
      })
  }

  submitContacto() {    
    if (this.contacto.invalid) {
      this.contactoIncorrecto = true;
    } else {
      this.contactoIncorrecto = false;
      this.enviando = true;
      this.envioCorrecto = false;
      this._usuarioService.contacto(
        this.contacto.controls['nome'].value, 
        this.contacto.controls['email'].value, 
        this.contacto.controls['assunto'].value, 
        this.contacto.controls['corpo'].value)
        .subscribe((res:any) => {

          this.enviando = false;
          this.envioCorrecto = true;

          

        })
    }
  }
}
