import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-palpitarrodada',
  templateUrl: './palpitarrodada.component.html',
  styleUrls: ['./palpitarrodada.component.css']
})

export class PalpitarrodadaComponent implements OnInit {

  campeonatos = [];
  seleccionado = 0;
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
    this.http.post("http://bolaocraquedebola.com.br/public/mobile/cellbolao", {id:3, champ: this.seleccionado}).
    subscribe(res => {
      this.campeonato = res;
      this.partidos = res['rodada'];
      console.log(this.partidos);
    })
  }

  logForm(value: any) {
    console.log(value);
  }

}