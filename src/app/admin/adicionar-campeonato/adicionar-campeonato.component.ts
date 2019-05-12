import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend.service';
import { CampeonatoService } from '../../services/campeonato.service';

@Component({
  selector: 'app-adicionar-campeonato',
  templateUrl: './adicionar-campeonato.component.html',
  styleUrls: ['./adicionar-campeonato.component.css']
})
export class AdicionarCampeonatoComponent implements OnInit {

  campeonato: FormGroup;
  urlCampeonato: FormGroup;

  constructor(private _campeonatoService: CampeonatoService, private backendService: BackendService) { }

  ngOnInit() {
    this.campeonato = new FormGroup({
      ch_nome: new FormControl(),
      ch_sec1_ini: new FormControl(),
      ch_sec1_fin: new FormControl(),
      ch_sec2_ini: new FormControl(),
      ch_sec2_fin: new FormControl(),
      ch_sec3_ini: new FormControl(),
      ch_sec3_fin: new FormControl(),
      ch_sec1_desc: new FormControl(),
      ch_sec2_desc: new FormControl(),
      ch_sec3_desc: new FormControl(),
      ch_dchamp: new FormControl(),
      ch_djogo: new FormControl(),
      ch_drodada: new FormControl(),
      ch_dpalpite: new FormControl(),
      ch_logocampeonato: new FormControl(),
      dr_url: new FormControl()
    });

  }

  onSubmit() {
    let form = this.campeonato.value;
    this._campeonatoService.postCampeonato(form).
      subscribe((res:any) => {

      }, error => {

      })
  }
}
