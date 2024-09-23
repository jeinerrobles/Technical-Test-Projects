import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api/auth';  // URL del backend de Laravel

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  // Registro de usuario
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Inicio de sesión
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Obtener el perfil del usuario
  getProfile(): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }

  // Logout
  logout(): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

  // Método para verificar si el token es válido
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');  // Recupera el token del localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Incluye el token en las cabeceras
    });
  }
}
