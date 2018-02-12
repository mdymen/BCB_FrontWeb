import { Posicion } from "./posicion";

export class Grupo {
    grupo:string;
    equipos:Posicion[];

    constructor(private g:string, private e:Posicion[]) {
        this.grupo = g;
        this.equipos = e;
    }

}
