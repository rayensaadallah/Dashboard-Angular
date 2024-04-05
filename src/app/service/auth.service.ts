import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginDto } from '../dto/request/LoginDto';
import { RegisterDto } from '../dto/request/RegisterDto';
import { jwtDecode } from 'jwt-decode';
import { JwtResponse } from '../dto/response/JwtResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  private baseUrl = 'http://localhost:8088/auth'; // Base API URL
  accessToken: string;
  idUser: string;
  username: string;
  roles: string[] | undefined;

  saveToken(token: string) {
    localStorage.setItem('accessToken', token);
    this.isAuthenticated = !!token;
}
  
  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<any> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/login`, loginDto).pipe(
      tap(jwtResponse => this.saveToken(jwtResponse.token)));
    }
  register(registerDto: RegisterDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, registerDto);
  }

  loadprofile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['accessToken'];
    let decodedJwt: any = jwtDecode(this.accessToken);
    this.idUser= decodedJwt.sub;
    this.username = decodedJwt.username;
    this.roles = decodedJwt.role.map(r => r.authority); // Adjust based on actual token structure
  }
  logout() {
    localStorage.removeItem('accessToken');
    this.isAuthenticated=false;
    this.accessToken=undefined;
    this.roles=undefined;
    this.idUser= undefined;
    this.username = undefined;
  }
}
