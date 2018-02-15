import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login:FormGroup;

  constructor(private http: HttpClient,  private router: Router) { }

  /**
   * Crea el formulario de login
   */
  ngOnInit() {
    this.login = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)

    });

  }

  /**
   * por ahora sin validar mucho el formulario consigue logarse
   */
  onSubmit() {
    console.log("xxxx " + this.login.valid);
    if (this.login.valid) {
      this.http.post("http://www.dymenstein.com/public/mobile/cellogin", 
        {us:this.login.value.usuario, pass: this.login.value.password})
          .subscribe(result => {
            if (!result) {
              localStorage.setItem("id", null);
              localStorage.setItem("username", null);
              localStorage.setItem("cash", null);
              localStorage.setItem("jsonUsuario", null);
            } else {
              localStorage.setItem("id", result['us_id']);
              localStorage.setItem("username", result['us_username']);
              localStorage.setItem("cash", result['us_cash']);
              localStorage.setItem("jsonUsuario", JSON.stringify(result));
              this.router.navigate(['/']);
            }
            console.log(result);
          });
    }
  }

  cadastrese() {
    alert("HOLA 2");
  }

}
