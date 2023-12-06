import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  //title = 'Angular';
  actions : Array<any> =[
    {title :"Home", route:"/home", icon : "house"},
    {title :"Products", route:"/products", icon : "search"},
    {title :"New Product", route:"/newProduct", icon : "safe"}

  ];
  currentAction :any;

  constructor(public appState: AppStateService) {
  }
  setCurrentAction(action: any) {
    this.currentAction = action;

  }
}
