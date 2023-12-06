import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {finalize, Observable} from "rxjs";
import { Injectable } from "@angular/core";
import {AppStateService} from "./app-state.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private appState : AppStateService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.appState.setProductState({
      status:"LOADING"
    })
    let req = request.clone({
      headers : request.headers.set("Authorization","Bearer JWT")
    });
    return next.handle(req).pipe(){
      finalize()
    };
  }
}
