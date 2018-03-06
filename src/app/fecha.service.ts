import { Injectable } from '@angular/core';

@Injectable()
export class FechaService {

  constructor() { }

  puedePalpitar(fecha:string): boolean {

    let anomes = fecha.split("-");
    let diahora = anomes[2].split(" ");
    let horas = diahora[1].split(":");

    console.log(anomes);
    console.log(diahora);
    console.log(horas);

    return false;
  }

}
