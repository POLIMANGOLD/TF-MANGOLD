import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, pipe } from 'rxjs';
import { LoginServicioService } from '../servicio/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor (private router: Router,
    private loginService: LoginServicioService) {}
  canActivate(
  
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  

      const isLogged= false;
       
      return   this.loginService.verificarToken()
       .pipe(
        map((usuarioAutenticado) => { 
         if(!usuarioAutenticado){
          return this.router.createUrlTree(['login'])
         }  else {
          return true
         }
        })
      )

      }
}
