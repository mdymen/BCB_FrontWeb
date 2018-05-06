import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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

  constructor(private http: HttpClient,
    private router: Router,
    private backend: BackendService,
    private spinnerService: Ng4LoadingSpinnerService) { }

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
    this.mostrarRegistrarse = false;
    this.mostrarLogin = true;
  }

  /**
   * por ahora sin validar mucho el formulario consigue logarse
   */
  onSubmitLogin() {
    if (this.login.valid) {
      this.loguearse(this.login.value.usuario, this.login.value.password);
    }
  }

  loguearse(usuario, password) {
    this.spinnerService.show();
    this.http.post("http://www.dymenstein.com/public/mobile/cellogin",
      { us: usuario, pass: password })
      .subscribe(result => {
        if (!result) {
          localStorage.setItem("id", null);
          localStorage.setItem("username", null);
          localStorage.setItem("cash", null);
          localStorage.setItem("jsonUsuario", null);
          localStorage.setItem("admin", null);
          localStorage.setItem("res_pal", null);
          localStorage.setItem("res_rod_pal", null);
          localStorage.setItem("info_rod", null);
          localStorage.setItem("img", null);
          this.loginIncorrecto = true;
        } else {
          localStorage.setItem("id", result['us_id']);
          localStorage.setItem("username", result['us_username']);
          localStorage.setItem("cash", result['us_cash']);
          localStorage.setItem("admin", result['us_admin']);
          localStorage.setItem("res_pal", result['res_pal']);
          localStorage.setItem("res_rod_pal", result['res_rod_pal']);
          localStorage.setItem("info_rod", result['info_rod']);
          localStorage.setItem("foto", result['us_foto']);
          localStorage.setItem("jsonUsuario", JSON.stringify(result));
          this.router.navigate(['/']);
          location.reload();
        }
        this.spinnerService.hide();
      });
  }

  /**
   * Para mostrar el formulario de registro
   */
  cadastrese() {
    this.mostrarRegistrarse = true;
    this.mostrarLogin = false;
  }

  /**
   * Para volver a mostrar el formulario de login y 
   * salir del formulario de registro
   */
  backToLogin() {
    this.mostrarRegistrarse = false;
    this.mostrarLogin = true;
  }

  /**
   * Submete el formulario de registro y luego 
   * se loguea
   */
  onSubmitRegistro() {
    this.spinnerService.show();
    var form = this.registro.value;

    this.http.post(this.backend.getBackEnd() + "cadastroweb",
      { username: form.usuario, password: form.password, email: form.email, grito: form.grito }).
      subscribe(result => {
        this.spinnerService.hide();
        this.loguearse(form.usuario, form.password);
      })
  }



}
