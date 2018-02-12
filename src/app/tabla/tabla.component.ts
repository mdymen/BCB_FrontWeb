import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  isGrupos:boolean;
  

  constructor(private http:HttpClient) { }

  ngOnInit() {

    this.http.post("http://www.bolaocraquedebola.com.br/public/mobile/cellbolao", {id:3, champ:17})
    .subscribe(result => {
      console.log(result);
    });
  }

}
