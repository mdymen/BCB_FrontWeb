import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Headers } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
//import {Globals} from '../globals';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { PalpitarrodadaComponent } from './palpitarrodada/palpitarrodada.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { CaixaComponent } from './caixa/caixa.component';


const routes: Routes = [
  {path: "main", component: MainComponent },
  {path: "cadastro", component: RegistrarseComponent },
  {path: "login", component: LoginComponent },
  {path: "", component: PalpitarrodadaComponent, canActivate:[AuthGuard] },
  {path: "palpitarrodada", component: PalpitarrodadaComponent, canActivate:[AuthGuard] },
  {path: "palpitarrodada/:campeonato", component: PalpitarrodadaComponent, canActivate:[AuthGuard] },
  {path: "palpitarrodada/:campeonato/rodada/:rodada", 
    component: PalpitarrodadaComponent, canActivate:[AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    PalpitarrodadaComponent,
    LoginComponent,
    MainComponent,
    RegistrarseComponent,
    MeuPerfilComponent,
    CaixaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
