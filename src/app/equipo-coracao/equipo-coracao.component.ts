import { Component, OnInit } from '@angular/core';
import { PaisService } from '../admin/services/pais.services';
import { EquiposService } from '../services/equipos.service';

@Component({
  selector: 'app-equipo-coracao',
  templateUrl: './equipo-coracao.component.html',
  styleUrls: ['./equipo-coracao.component.css']
})
export class EquipoCoracaoComponent implements OnInit {

  paises = [];
  equipos = [];

  equiposFiltrados = [];
  equipo = null;

  assets = "/assets/equipos/grande/";

  constructor(private _paisesService: PaisService,
    private _equipoService: EquiposService) {

    this.load();

  }

  ngOnInit() {
  }

  /**
   * Cuando se selecciona un pais, carga todos los equipos disponibles de ese pais
   * @param pais 
   */
  change(pais) {
    this._equipoService.getTimes(pais)
      .subscribe((res: any) => {
        this.equipos = res.body;
        this.equiposFiltrados = res.body;
      })
  }

  /**
   * Carga todos los paises disponibles para luego ver sus equipos
   */
  load() {
    this._paisesService.get()
      .subscribe((res: any) => {
        this.paises = res.body;
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
   * Muestra en la pantalla el equipo que puede ser seleccionado
   * como equipo del corazon
   * @param equipo 
   */
  select(equipo) {
    this.equipo = equipo;
  }

}
