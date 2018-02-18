import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-adicionar-campeonato',
  templateUrl: './adicionar-campeonato.component.html',
  styleUrls: ['./adicionar-campeonato.component.css']
})
export class AdicionarCampeonatoComponent implements OnInit {

  campeonato: FormGroup;

  constructor() { }

  ngOnInit() {
    this.campeonato = new FormGroup({
      nome: new FormControl(),
      sec1_ini: new FormControl(),
      sec1_fin: new FormControl(),
      sec2_ini: new FormControl(),
      sec2_fin: new FormControl(),
      sec3_ini: new FormControl(),
      sec3_fin: new FormControl(),
      sec1_desc: new FormControl(),
      sec2_desc: new FormControl(),
      sec3_desc: new FormControl(),
      dchamp: new FormControl(),
      djogo: new FormControl(),
      drodada: new FormControl(),
      dpalpite: new FormControl(),
      descricao: new FormControl(),
      data_inicio: new FormControl(),
      data_termino: new FormControl(),
      logocampeonato: new FormControl()
    });
  }

}
