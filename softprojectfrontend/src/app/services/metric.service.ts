import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  private apiUrl = 'http://127.0.0.1:8000/api/metrics';  // Endpoint del backend de Laravel

  constructor(private http: HttpClient) {}

  getProjectsByStatus(): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get(`${this.apiUrl}/status`, { headers });
  }

  getTotalBudget(): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get(`${this.apiUrl}/total-budget`, { headers });
  }

  getProjectsByZone(): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get(`${this.apiUrl}/zone`, { headers });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');  // El token debe estar guardado en el localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
