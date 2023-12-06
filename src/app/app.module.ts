// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importez CommonModule ici
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {AppErrorsComponent} from "./app-errors/app-errors.component";
import {AppHttpInterceptor} from "./services/app-http.interceptor";


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, RouterModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule, DashboardComponent, NavbarComponent, AppErrorsComponent],
  providers: [
    {provide: APP_INITIALIZER, useClass : AppHttpInterceptor, multi : true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}


