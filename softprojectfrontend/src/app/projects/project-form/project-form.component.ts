import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  projectForm: FormGroup;
  projectId: number | null = null;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      value: [0, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      zone: ['', Validators.required],
      type: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.projectId = +params['id'];
        this.loadProject(this.projectId);
      }
    });
  }

  loadProject(id: number) {
    this.projectService.getProjectById(id).subscribe(
      (data) => {
        this.projectForm.patchValue(data);
      },
      (error) => {
        this.errorMessage = 'Error al cargar el proyecto'
        console.error('Error loading project', error);
      }
    );
  }

  submitForm() {
    if (this.projectId) {
      // Editar proyecto
      this.projectService.updateProject(this.projectId, this.projectForm.value).subscribe(
        () => this.router.navigate(['/projects']),
        (error) => {
          this.errorMessage = 'Error al actualizar el proyecto'
          console.error('Error updating project', error)
        } 
      );
    } else {
      // Crear proyecto
      this.projectService.createProject(this.projectForm.value).subscribe(
        () => this.router.navigate(['/projects']),
        (error) =>{
          this.errorMessage = 'Error al crear el proyecto'
          console.error('Error creating project', error)
        }
      );
    }
  }

}
