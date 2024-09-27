import { Component, OnInit } from '@angular/core';
import { MetricService } from '../../services/metric.service';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.css']
})
export class ProjectSummaryComponent implements OnInit {

  projectsInExecution: number = 0;
  viableProjects: number = 0;
  projectsInContracting: number = 0;

  constructor(private metricService: MetricService) {}

  ngOnInit(): void {
    this.loadProjectSummary();
  }

  loadProjectSummary(): void {
    this.metricService.getProjectsByStatus().subscribe(data => {
      // Suponiendo que data tiene un formato como [{status: 'In Execution', total: 10}, ...]
      this.projectsInExecution = data.find((item: any) => item.status === 'En ejecución')?.total || 0;
      this.viableProjects = data.find((item: any) => item.status === 'Viable')?.total || 0;
      this.projectsInContracting = data.find((item: any) => item.status === 'Por iniciar proceso de contratación')?.total || 0;
    });
  }

}
