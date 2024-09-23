import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://127.0.0.1:8000/api/projects';  // URL del backend de Laravel

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get(`${this.apiUrl}`, { headers });
  }

  getProjectById(id: number): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  createProject(projectData: any): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.post(`${this.apiUrl}`, projectData, { headers });
  }

  updateProject(id: number, projectData: any): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, projectData, { headers });
  }

  deleteProject(id: number): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');  // El token debe estar guardado en el localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
