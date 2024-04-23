import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ConnectedUser } from '../dto/response/ConnectedUser';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // Try to get the token from the AuthService; if it's not available, fall back to localStorage
    const token = this.authService.connectedUser?.accessToken || localStorage.getItem("accessToken");
    if (token && !request.url.includes("auth/")) {
      console.log("from intercept");
      console.log("JWT Token: ", token);
      const newReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(newReq);
    } else {
      return next.handle(request);
    }
  }
}
