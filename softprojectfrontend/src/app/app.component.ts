import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'softprojectfrontend';
  
  constructor(public authService: AuthService, private router: Router) {}

  isMenuOpen = true;  // Estado del menú, inicialmente abierto

  isUserAuthenticated() {
    return this.authService.isAuthenticated();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;  // Cambia el estado del menú
  }

  logout(): void {
    this.authService.logout().subscribe(
      (response) => {
        console.log('Logged out successfully');
        localStorage.removeItem('access_token'); // Elimina el token del localStorage
        this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
      },
      (error) => {
        console.error('Logout failed', error);
      }
    );
  }
}
