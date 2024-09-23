import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';  // Asegúrate de importar el guard
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { ProjectMetricsComponent } from './projects/project-metrics/project-metrics.component';

// Definición de las rutas de la aplicación
const routes: Routes = [
  { path: '', component: LoginComponent }, // Ruta predeterminada
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Las siguientes rutas están protegidas por el AuthGuard
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Ruta protegida
  { path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard] }, // Ruta protegida
  { path: 'projects/create', component: ProjectFormComponent, canActivate: [AuthGuard] }, // Ruta protegida
  { path: 'projects/edit/:id', component: ProjectFormComponent, canActivate: [AuthGuard] }, // Ruta protegida
  { path: 'metrics', component: ProjectMetricsComponent, canActivate: [AuthGuard] }, // Ruta protegida
  // Redirección predeterminada a la página de inicio de sesión
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
