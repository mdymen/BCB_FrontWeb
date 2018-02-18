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
import { AdicionarEquipoComponent } from './admin/adicionar-equipo/adicionar-equipo.component';
import { AdicionarCampeonatoComponent } from './admin/adicionar-campeonato/adicionar-campeonato.component';
import { AdicionarRodadaComponent } from './admin/adicionar-rodada/adicionar-rodada.component';
import { PartidosComponent } from './admin/partidos/partidos.component';
import { AdicionarPartidosComponent } from './admin/adicionar-partidos/adicionar-partidos.component';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { CaixaComponent } from './caixa/caixa.component';
import { BackendService } from './backend.service';


const routes: Routes = [
  {path: "adicionarpartidos", component: AdicionarPartidosComponent },
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
    AdicionarEquipoComponent,
    AdicionarCampeonatoComponent,
    AdicionarRodadaComponent,
    PartidosComponent,
    AdicionarPartidosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard, BackendService],
  bootstrap: [AppComponent]
})

export class AppModule { }
