import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoDto } from '../dto/UserInfoDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8088/admin'; // Base API URL

  
  getUsers(): Observable<UserInfoDto[]> {
    return this.http.get<UserInfoDto[]>(`${this.baseUrl}/list-users`);
  }

  upgradeToPro(email: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/upgrade-to-professional/${email}`, null);
  }

  getUsersPro(): Observable<UserInfoDto[]> {
    return this.http.get<UserInfoDto[]>(`${this.baseUrl}/list-pro`);
  }

}
