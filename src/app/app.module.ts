import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Headers } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//import {Globals} from '../globals';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes} from '@angular/router';
import { LoginGuard } from './login.guard';
import { JogosComponent } from './jogos/jogos.component';
import { IndexComponent } from './index/index.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path: "login", component: LoginComponent },
  {path: "inicio", component: IndexComponent },
  {path: "main", component: MainComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JogosComponent,
    IndexComponent,
    MainComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
