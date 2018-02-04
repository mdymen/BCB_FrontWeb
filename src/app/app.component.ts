import { Component } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
//import {Globals} from '../globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
 /* styleUrls: 
  [
    './app.component.css',
    '../assets/css/bootstrap.min.css',
    '../assets/css/style.min.css',
    '../assets/css/filetypes.css',
    '../assets/fonts/glyphicons-filetypes-regular.ttf',
    '../assets/css/glyphicons.css'
  ]*/
})

export class AppComponent {
 
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

 
  }

}