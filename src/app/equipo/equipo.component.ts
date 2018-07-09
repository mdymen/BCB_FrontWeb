import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { EquiposService } from '../services/equipos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  idEquipo;
  equipo;

  constructor(private spinnerService:Ng4LoadingSpinnerService,
    private _equiposService:EquiposService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.idEquipo = params['equipo'];
    });
   }

  ngOnInit() {
    this._equiposService.get(this.idEquipo)
      .subscribe((res:any) => {
        console.log(res);
      })
  }

}
