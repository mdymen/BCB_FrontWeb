import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Headers } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { CargarcampeonatoComponent } from './admin/cargarcampeonato/cargarcampeonato.component';
import { AdminGuard } from './admin.guard';
import { CampeonatoService } from './entidades/campeonato.service';
import { FechaService } from './fecha.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SetrodadaComponent } from './admin/setrodada/setrodada.component';
import { PosicionesComponent } from './posiciones/posiciones.component';
import { RankingComponent } from './ranking/ranking.component';
import { RankingsComponent } from './rankings/rankings.component';
import { InicioComponent } from './inicio/inicio.component';


const routes: Routes = [
  {path: "caixa", component: CaixaComponent, canActivate:[AuthGuard] },
  {path: "setrodada", component: SetrodadaComponent, canActivate:[AdminGuard] },
  {path: "adicionarrodada", component: AdicionarRodadaComponent, canActivate:[AdminGuard] },
  {path: "adicionarequipos", component: AdicionarEquipoComponent, canActivate:[AdminGuard] },
  {path: "adicionarcampeonato", component: AdicionarCampeonatoComponent, canActivate:[AdminGuard] },
  {path: "partidos", component: PartidosComponent, canActivate:[AdminGuard] },
  {path: "adicionarpartidos", component: AdicionarPartidosComponent, canActivate:[AdminGuard] },
  {path: "main", component: MainComponent },
  {path: "cadastro", component: RegistrarseComponent },
  {path: "login", component: LoginComponent },
  {path: "meuperfil", component : MeuPerfilComponent},
  {path: "", component: PalpitarrodadaComponent, canActivate:[AuthGuard] },
  {path: "palpitarrodada", component: PalpitarrodadaComponent, canActivate:[AuthGuard] },
  {path: "palpitarrodada/:campeonato", component: PalpitarrodadaComponent, canActivate:[AuthGuard] },
  {path: "palpitarrodada/:campeonato/rodada/:rodada", 
    component: PalpitarrodadaComponent, canActivate:[AuthGuard] },
  {path: "inicio", component:InicioComponent}

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
    AdicionarPartidosComponent,
    CargarcampeonatoComponent,
    SetrodadaComponent,
    PosicionesComponent,
    RankingComponent,
    MeuPerfilComponent,
    RankingsComponent,
    CaixaComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [AuthGuard, BackendService, AdminGuard, CampeonatoService, FechaService],
  bootstrap: [AppComponent]
})

export class AppModule { }
