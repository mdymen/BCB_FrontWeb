import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import { Partido }    from '../partido';

@Component({
  selector: 'app-palpitarrodada',
  templateUrl: './palpitarrodada.component.html',
  styleUrls: ['./palpitarrodada.component.css']
})

export class PalpitarrodadaComponent implements OnInit {

  campeonatos = [];
  seleccionado = 0;
  partidosj = [];
  partidos = [];
  campeonato;
  url = "http://www.bolaocraquedebola.com.br";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.post("http://bolaocraquedebola.com.br/public/mobile/cellgetcampeonatosabertos/?",{}).
    subscribe(res => { 

      this.campeonatos.push(res[0]);
      this.campeonatos.push(res[1]);
    
    });
  }

  public onChange(event): void {  // event will give you full breif of action
    this.seleccionado = event.target.value;
    this.http.post("http://bolaocraquedebola.com.br/public/mobile/cellbolao", {id:3, champ: this.seleccionado})
    .subscribe(res => {
      this.campeonato = res;
   //   this.partidos.push(res['rodada']);


    /*  this.partidosj = res['rodada'];

      let x1 = this.partidosj[1];

      let partido1 = <Partido>x1;
      this.partidos.push(partido1);

      let x = this.partidosj[0];

      let partido = <Partido>x;
      this.partidos.push(partido);

*/

     for (let partido of res['rodada']) {
        this.partidos.push(<Partido>partido);
     }

     console.log(res['rodada']);

    })
  }

  logForm(value: any) {
    console.log(value);
  }
}