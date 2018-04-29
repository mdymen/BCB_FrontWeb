import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-infocampeonato',
  templateUrl: './infocampeonato.component.html',
  styleUrls: ['./infocampeonato.component.css']
})
export class InfocampeonatoComponent implements OnInit {

  @Input() acumulado; 

  constructor() { }

  ngOnInit() {
    console.log("acumulado", this.acumulado);
  }

}
