import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Headers } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
//import {Globals} from '../globals';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes} from '@angular/router';
import { LoginGuard } from './login.guard';
import { JogosComponent } from './jogos/jogos.component';
import { IndexComponent } from './index/index.component';
import { MainComponent } from './main/main.component';
import { PalpitarrodadaComponent } from './palpitarrodada/palpitarrodada.component';


const routes: Routes = [
  {path: "login", component: LoginComponent },
  {path: "inicio", component: IndexComponent },
  {path: "main", component: MainComponent },
  {path: "palpitarrodad", component: PalpitarrodadaComponent },
  {path: "palpitarrodada/:campeonato", component: PalpitarrodadaComponent }
  {path: "palpitarrodada/:campeonato/rodada/:rodada", component: PalpitarrodadaComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JogosComponent,
    IndexComponent,
    MainComponent,
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
  providers: [LoginGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
