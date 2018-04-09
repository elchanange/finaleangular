import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './services/auth.service';

@Injectable()
export class DisconnectGuard implements CanActivate {
  constructor(public auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const authState = this.auth.stateChanged;
    return new Observable<boolean>(observer => {
      authState.subscribe((user) => {
        if (user) {
          this.router.navigateByUrl('/');
        }
        observer.next(user === null);
      });
    });
  }
}
//sasd
