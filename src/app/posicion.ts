export class Posicion {

    id: number;
    equipo: string;
    puntos: number;
    partidosJugados: number;

    constructor(private i: number, private e: string,
        private p: number, private pj: number) {
        this.id = i;
        this.equipo = e;
        this.puntos = p;
        this.partidosJugados = pj;
    }
}
