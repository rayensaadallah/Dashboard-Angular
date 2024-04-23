import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ConnectedUser } from '../dto/response/ConnectedUser';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const connectedUser = this.authService.connectedUser;

    if (connectedUser && Array.isArray(connectedUser.roles) && connectedUser.roles.includes("ROLE_ADMIN")) {
      return true;
    }

    this.router.navigateByUrl("/notAuthorized");
    return false;
  }
}
