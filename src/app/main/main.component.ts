import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
/*
  title = 'app';
  lists: any[] = [];
  listaJogos: any[] = [];
  url = "http://bolaocraquedebola.com.br";
  teste = "";
*/
  constructor(private http: HttpClient/*, private globals: Globals*/) {
   // localStorage.setItem("v","hola");
  } 

  ngOnInit(): void {
    // Make the HTTP request:
 /*  this.http.post("http://bolaocraquedebola.com.br/public/mobile/celproximojogos/?", {us_id:"3"}).
    subscribe(res => { 
      this.lists.push(res);
      this.listaJogos = this.lists[0]
      console.log(this.listaJogos);
    
    });*/
  }

}
