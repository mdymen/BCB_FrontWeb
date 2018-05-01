import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-editar-partido',
  templateUrl: './form-editar-partido.component.html',
  styleUrls: ['./form-editar-partido.component.css']
})
export class FormEditarPartidoComponent implements OnInit {

  partido:any;
  mostrarModal:boolean = false;
  equipos1 = [];
  equipos2 = [];
  rodadas = [];
  rodada:any;


  constructor() { 

  }

  ngOnInit() {
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

 
}
