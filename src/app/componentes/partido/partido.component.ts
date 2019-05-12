import { Component, Input } from "@angular/core";

@Component ({
    selector: 'partido',
    templateUrl: './partido.component.html',
    styleUrls: ['./partido.component.css']
})
export class PartidoComponent {

    @Input("equipo1") equipo1;

    constructor() {
    }
}