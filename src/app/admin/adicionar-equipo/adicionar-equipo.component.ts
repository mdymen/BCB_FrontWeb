import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend.service';
import { CampeonatoService } from '../../entidades/campeonato.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Equipo } from '../../equipo';

@Component({
  selector: 'app-adicionar-equipo',
  templateUrl: './adicionar-equipo.component.html',
  styleUrls: ['./adicionar-equipo.component.css']
})
export class AdicionarEquipoComponent implements OnInit {

  campeonatos = [];
  equipos = [];

  constructor(private http: HttpClient, private backendAdmin:BackendService
    , private campeonatoService:CampeonatoService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.campeonatoService.getCampeonatos().subscribe(result => {
      this.campeonatos = result as any;
      this.spinnerService.hide();
    })
    this.equipos.push(new Equipo(null,null,null,null,null,null,null,null));
  }

  adicionarequipo() {
    this.equipos.push(new Equipo(null,null,null,null,null,null,null,null));
  }

  grabarEquipos(equipos) {
    console.log(equipos);
  }
}
