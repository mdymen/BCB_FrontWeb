import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit {

  constructor(private http: HttpClient,
    private backend:BackendService,
    private spinnerService:Ng4LoadingSpinnerService) { }

  ngOnInit() {
  }

  plano(plano:Number) {
    this.spinnerService.show();
    this.http.post(this.backend.getBackEndNormal() + "caixa/plano", {p:plano, user:localStorage.getItem("id"), email:"martin@dymenstein.com"})
      .subscribe(result => {
        this.spinnerService.hide();
        console.log(result);
        window.location.href='https://pagseguro.uol.com.br/v2/checkout/payment.html?code=' + result;
      });
  }

  testar(plano:Number) {
    this.spinnerService.show();
    this.http.post(this.backend.getBackEndNormal() + "caixa/testarcaixax", {p:plano, user:localStorage.getItem("id"), email:"martin@dymenstein.com"})
      .subscribe(result => {
        this.spinnerService.hide();
        console.log(result);
        window.location.href='https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=' + result;
      });
  }
}
