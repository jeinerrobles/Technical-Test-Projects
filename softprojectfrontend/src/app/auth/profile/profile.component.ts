import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: any = {}; // Aquí se almacenarán los datos del perfil del usuario

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProfile(); // Cargar el perfil del usuario cuando el componente se inicialice
  }

  loadProfile(): void {
    this.authService.getProfile().subscribe(
      (data) => {
        this.userProfile = data; // Asignar los datos del perfil al objeto userProfile
      },
      (error) => {
        console.error('Error loading profile', error);
      }
    );
  }

}
