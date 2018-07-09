import { Component, OnInit } from '@angular/core';
import { EquipoService } from '../services/equipos.service';
import { CampeonatoService } from '../../entidades/campeonato.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-equipo-campeonato',
  templateUrl: './equipo-campeonato.component.html',
  styleUrls: ['./equipo-campeonato.component.css']
})
export class EquipoCampeonatoComponent implements OnInit {

  equiposFiltrados = [];
  equipos = [];

  equiposAdicionados = [];

  campeonatos = [];
  campeonato;

  equiposCadastrados = [];

  constructor(private _equipoService: EquipoService,
    private _campeonatoService: CampeonatoService,
    private spinnerService:Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.load();
    this.loadCampeonatos();
  }

  load() {
    this._equipoService.load()
      .subscribe((res: any) => {
        this.equipos = res.body;
        this.equiposFiltrados = res.body;
        console.log(res);
      })
  }

  loadCampeonatos() {
    this._campeonatoService.load()
      .subscribe((res: any) => {
        this.campeonatos = res.body;
      })
  }

  /**
   * Filtra por el texto escrito en el campo de busca de equipos
   * @param text 
   */
  filter(text) {
    if (!text) {
      this.equiposFiltrados = this.equipos
    } else {
      this.equiposFiltrados = this.equipos.
        filter(equipo => {
          return equipo.eq_nome.toLowerCase().includes(text);
        })
    }

  }

  /**
   * Adiciona el equipo seleccionado a la lista de equipos del campeonato
   * @param equipo 
   */
  add(equipo) {
    let equipoCampeonato = {
      ec_idchampionship: this.campeonato,
      ec_idequipo: equipo.eq_id,
      ec_pontos: 0,
      ec_grupo: "",
      nome: equipo.eq_nome,
    }

    this.equiposAdicionados.push(equipoCampeonato);
  }

  /**
   * Remove el equipo de la lista de equipos seleccionados
   * @param equipo 
   */
  remove(equipo) {
    const index = this.equiposAdicionados.indexOf(equipo);
    this.equiposAdicionados.splice(index, 1);
  }

  /**
   * Seta el idCampeonato para todos los equipos que seran cadastrados a él
   * @param  idCampeonato
   */
  seleccionarCampeonato($event) {
    this.spinnerService.show();
    this.campeonato = $event;
    this.equiposAdicionados.map(equipo => equipo.ec_idchampionship = $event);

    this._campeonatoService.loadByCampeonato(this.campeonato)
      .subscribe((res:any) => {
        console.log(res);
        this.equiposCadastrados = res.body;
        this.spinnerService.hide();
      });
  }

  save() {
    let toSave = {
      equipos: this.equiposAdicionados
    }

    this.spinnerService.show();

    this._campeonatoService.save(toSave)      
      .subscribe((res: any) => 
        { 
          this.equiposAdicionados = [];
          this.spinnerService.hide();
        }, error => {
          console.log(error);
        }
      );
  }
}
