import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {json} from "express";

@Component({
  selector: 'app-app-errors',
  standalone: true,
  imports: [],
  templateUrl: './app-errors.component.html',
  styleUrl: './app-errors.component.css'
})
export class AppErrorsComponent {
  constructor(public appState : AppStateService) {

  }

}
