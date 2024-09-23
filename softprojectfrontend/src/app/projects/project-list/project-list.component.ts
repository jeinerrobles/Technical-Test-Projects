import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: any[] = [];
  filteredProjects: any[] = []; // Proyectos filtrados
  successMessage: string = '';
  errorMessage: string = '';

  searchText: string = ''; // Campo para búsqueda combinada

  constructor(private projectService: ProjectService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(
      (data: any) => {
        this.projects = data;
        this.filteredProjects = data; // Inicialmente muestra todos los proyectos
      },
      (error) => {
        this.errorMessage = 'Error al cargar los proyectos'
        console.error('Error fetching projects', error);
      }
    );
  }

   // Método para filtrar proyectos
   filterProjects(): void {
    const searchTextLower = this.searchText.toLowerCase();

    this.filteredProjects = this.projects.filter(project => {
      return (
        project.name.toLowerCase().includes(searchTextLower) || 
        project.zone.toLowerCase().includes(searchTextLower) ||
        project.status.toLowerCase().includes(searchTextLower)
      );
    });
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id).subscribe(
      () => {
        this.successMessage = 'Proyecto eliminado correctamente';
        this.loadProjects(); // Recargar la lista de proyectos
      },
      (error) => {
        this.errorMessage = 'Error al eliminar el proyecto'
        console.error('Error deleting project', error);
      }
    );
  }

}
