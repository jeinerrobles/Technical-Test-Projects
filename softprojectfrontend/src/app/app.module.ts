import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { AuthService } from './services/auth.service'; // Asegúrate de importar tu servicio
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './auth/profile/profile.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ProjectMetricsComponent } from './projects/project-metrics/project-metrics.component';
import { ProjectSummaryComponent } from './projects/project-summary/project-summary.component';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProjectListComponent,
    ProjectFormComponent,
    ProfileComponent,
    ProjectMetricsComponent,
    ProjectSummaryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HighchartsChartModule,
  ],
  providers: [
    AuthService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
