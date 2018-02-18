import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-adicionar-partidos',
  templateUrl: './adicionar-partidos.component.html',
  styleUrls: ['./adicionar-partidos.component.css']
})
export class AdicionarPartidosComponent implements OnInit {

  partidos = [];

  constructor() { }

  ngOnInit() {
  }

}
