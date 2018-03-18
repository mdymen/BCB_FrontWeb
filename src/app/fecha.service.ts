import { Injectable } from '@angular/core';

@Injectable()
export class FechaService {

  constructor() { }

  puedePalpitar(fecha: string): boolean {

    // 2018-01-30 17:30:00

    // [2018,01,30 17:30:00]
    let anomes = fecha.split("-");
    let anoJogo = anomes[0];
    let mesJogo = anomes[1];

    // [30, 17:30:00]
    let diahora = anomes[2].split(" ");
    let diaJogo = diahora[0];

    // [17,30,00]
    let horas = diahora[1].split(":");

    let horaJogo = horas[0];
    let minutosJogo = horas[1];

    //7/3/2018 5:48:09
    let fechaHoraActual = new Date().toLocaleString();

    //[7,3,2018 5:48:09]
    let fhAtual = fechaHoraActual.split("/");
    let diaAtual = fhAtual[0];
    let mesAtual = fhAtual[1];

    //[2018, 5:48:09]
    let diahoraAtual = fhAtual[2].split(" ");
    let anoAtual = diahoraAtual[0];

    //[5,48,09]
    let horasAtual = diahoraAtual[1].split(":");
    let horaAtual = horasAtual[0];
    let minutoAtual = horasAtual[1];

    /*console.log(Number(anoJogo) + " >= " + Number(anoAtual) + " "
      + Number(mesJogo) + " >= " + Number(mesAtual) + " "
      + Number(diaJogo) + " >= " + Number(diaAtual) + " "
      + Number(horaJogo) + " >= " + Number(horaAtual));
*/

    if (Number(anoJogo) > Number(anoAtual)) {
      return true;
    }

    if (Number(anoJogo) == Number(anoAtual)
      && Number(mesJogo) > Number(mesAtual)) {
      return true;
    }

    if (Number(anoJogo) == Number(anoAtual)
      && Number(mesJogo) == Number(mesAtual)
      && Number(diaJogo) > Number(diaAtual)) {
      return true;
    }

    if (Number(anoJogo) == Number(anoAtual)
      && Number(mesJogo) == Number(mesAtual)
      && Number(diaJogo) == Number(diaAtual)
      && Number(horaJogo) >= Number(horaAtual)) {
      return true;
    }

    return false;
  }

}
