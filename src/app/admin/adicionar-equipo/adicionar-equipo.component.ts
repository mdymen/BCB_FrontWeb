import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend.service';
import { CampeonatoService } from '../../services/campeonato.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Equipo } from '../../equipo';
import { FormGroup, FormControl } from '@angular/forms';
import { EquipoService } from '../services/equipos.service';
import { PaisService } from '../services/pais.services';

@Component({
  selector: 'app-adicionar-equipo',
  templateUrl: './adicionar-equipo.component.html',
  styleUrls: ['./adicionar-equipo.component.css']
})
export class AdicionarEquipoComponent implements OnInit {


  equipos = [];
  paises = [];
  equiposCadastrados = [] //representa los equipos cadastrados del pais seleccionado
  idPais;

  constructor(private http: HttpClient,
    private backendAdmin: BackendService,
    private spinnerService: Ng4LoadingSpinnerService,
    private _equipoService: EquipoService,
    private _paisService: PaisService) { }

  ngOnInit() {

    this.load();
    this.add();

  }

  load() {
    this._paisService.get()
      .subscribe((result: any) => {
        this.paises = result.body;
      })
  }

  change($event) {
    this.idPais = $event;
    this.updatePais(this.idPais);
    this.loadEquiposCadastrados(this.idPais);
  }

  /**
   * Se o pais é trocado no meio, então atualiza todos es equipos 
   * @param pais 
   */
  updatePais(pais) {
    this.equipos.map(equipo => equipo.idPais = this.idPais);
  }

  save(equipos) {
    let toSave = {
      equipos: equipos
    }

    this.spinnerService.show();
    this._equipoService.save(toSave)
      .subscribe((res: any) => {
        this.equiposCadastrados = res.body;
        this.spinnerService.hide();
        this.reset();
      });
  }

  reset() {
    this.equipos = [];
  }

  add() {

    let equipo = {
      nome: "",
      idPais: this.idPais,
      logo: "",
    }

    this.equipos.push(equipo);
  }

  /**
   * Retorna la lista de equipos ya cadastrados del pais seleccionado
   * @param pais 
   */
  loadEquiposCadastrados(pais) {
    this.spinnerService.show();
    this._equipoService.loadByPais(pais)
      .subscribe((res: any) => {
        this.equiposCadastrados = res.body;
        this.spinnerService.hide();
        console.log(res);
      });
  }
}
