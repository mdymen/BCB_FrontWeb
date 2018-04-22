import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { HttpClient } from '@angular/common/http';
import { KeysPipe } from '../pipes/objectToArray';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FechaService } from '../fecha.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  partidos = [];

  constructor(private backService:BackendService, 
    private http:HttpClient,
    private spinnerService: Ng4LoadingSpinnerService,
    private fechaService: FechaService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.http.post(this.backService.getBackEndNormal() + "index/dezproximosjogos", {} )
      .subscribe(result => {

        this.spinnerService.hide();
        for (let partido of result['body']) {
          partido.disabled = this.fechaService.puedePalpitar(partido.mt_date) ? null : "disabled";
          this.partidos.push(partido);
        }

      });
  }

}
