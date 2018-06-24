import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-infocampeonato',
  templateUrl: './infocampeonato.component.html',
  styleUrls: ['./infocampeonato.component.css']
})
export class InfocampeonatoComponent implements OnInit {

  @Input() acumulado; 
  @Input() acumulado_rodada;

  constructor() { }

  ngOnInit() {

  }

}
