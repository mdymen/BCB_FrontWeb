import { Component, OnInit } from "@angular/core";
import { Campeonatos } from "../../config/campeonatos";
import { CampeonatoService } from "../../services/campeonato.service";

@Component({
    selector: 'app-admin-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})
export class AdminInicioComponent implements OnInit{

    campeonatos = [];

    constructor(public _campeonatoService: CampeonatoService) {}

    ngOnInit() {
        this.campeonatos = Campeonatos.Campeonatos;
    }

    update(idCampeonato) {
        this._campeonatoService.updateCampeonato(idCampeonato)
        .subscribe((res:any) => {

        }, error => {

        });
    }

    updateTodos() {
        this._campeonatoService.updateTodosCampeonatos()
        .subscribe((res:any) => {

        }, error => {

        });
    }
}