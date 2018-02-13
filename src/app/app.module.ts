import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Headers } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
//import {Globals} from '../globals';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { PalpitarrodadaComponent } from './palpitarrodada/palpitarrodada.component';

const routes: Routes = [
  {path: "", component: PalpitarrodadaComponent },
  {path: "palpitarrodada", component: PalpitarrodadaComponent },
  {path: "palpitarrodada/:campeonato", component: PalpitarrodadaComponent },
  {path: "palpitarrodada/:campeonato/rodada/:rodada", component: PalpitarrodadaComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PalpitarrodadaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
