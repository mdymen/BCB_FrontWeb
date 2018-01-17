import { Component } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  private listaJogos = [];
  private url = "http://www.bolaocraquedebola.com.br";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Make the HTTP request:
   this.http.post("http://bolaocraquedebola.com.br/public/mobile/celproximojogos/?", {us_id:"3"}).
    subscribe(res => { 
      res.map(res => {
        this.listaJogos.push(res);
      })
      console.log(this.listaJogos);
      console.log(this.listaJogos[1]);
    
    });
  }

}


