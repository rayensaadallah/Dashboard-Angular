import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginDto } from '../dto/request/LoginDto';
import { RegisterDto } from '../dto/request/RegisterDto';
import { jwtDecode } from 'jwt-decode';
import { JwtResponse } from '../dto/response/JwtResponse';
import { Router } from '@angular/router';
import { ConnectedUser } from '../dto/response/ConnectedUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerDto: RegisterDto;
  isAuthenticated: boolean = false;
  private baseUrl = 'http://localhost:8088/auth'; // Base API URL

  connectedUser: ConnectedUser;

  constructor(private router: Router, private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<any> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/login`, loginDto)
      .pipe(
        tap((response: any) => {
          this.connectedUser = response;
          this.saveUser(this.connectedUser);
        })
      );
  }

  loadJwtTokenFromLocalStorage(): void {
    const connectedUserString = localStorage.getItem("connectedUser");

    if (connectedUserString) {
      try {
        const parsedUser = JSON.parse(connectedUserString); // Parse from local storage
        if (parsedUser) {
          this.connectedUser = parsedUser;
          console.log("Connected User loaded:", this.connectedUser);
        } else {
          console.warn("Failed to parse connectedUser from local storage");
        }
      } catch (error) {
        console.error("Error parsing connectedUser:", error);
      }
    } else {
      console.warn("No connectedUser found in local storage");
    }
  }

  saveUser(register: ConnectedUser) {
    let decodedJwt: any = jwtDecode(register.accessToken);
    this.connectedUser.roles = decodedJwt.role.map(r => r.authority);
    localStorage.setItem('connectedUser', JSON.stringify(register));
    localStorage.setItem('accessToken', register.accessToken);
    this.isAuthenticated = true;
  }

  logout() {
    localStorage.clear();
    window.location.reload(); 
    this.router.navigateByUrl("/login");  
  }

  register(registerDto: RegisterDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, registerDto);
  }

}
