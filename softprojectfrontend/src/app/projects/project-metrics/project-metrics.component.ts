import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MetricService } from '../../services/metric.service';

@Component({
  selector: 'app-project-metrics',
  templateUrl: './project-metrics.component.html',
  styleUrls: ['./project-metrics.component.css']
})
export class ProjectMetricsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptionsStatus: Highcharts.Options = {};
  chartOptionsBudget: Highcharts.Options = {};
  chartOptionsZone: Highcharts.Options = {};


  constructor(private metricService: MetricService) { }


  ngOnInit(): void {
    this.loadProjectsByZone();
    this.loadProjectsByStatus();
    this.loadTotalBudget();
  }


  loadProjectsByStatus(): void {
    this.metricService.getProjectsByStatus().subscribe((data: any) => {
      console.log('Projects by Status:', data);  // Verifica los datos
      this.chartOptionsStatus = {
        chart: {
          type: 'column'  // Cambia el tipo de gráfico a 'column'
        },
        title: {
          text: 'Proyectos por Estado'
        },
        xAxis: {
          categories: data.map((item: any) => item.status),  // Etiquetas en el eje X
          title: {
            text: 'Estado'  // Título del eje X
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Número de Proyectos'  // Título del eje Y
          },
          labels: {
            overflow: 'justify'
          }
        },
        series: [{
          type: 'column',  // Tipo de serie 'column'
          name: 'Número de Proyectos',
          data: data.map((item: any) => item.total)  // Datos para la serie
        }]
      };
    });
  }

  loadTotalBudget(): void {
    this.metricService.getTotalBudget().subscribe((data: any) => {
      console.log('Total Budget:', data);  // Verifica los datos
      this.chartOptionsBudget = {
        chart: {
          type: 'line'  // Cambia el tipo de gráfico a 'line'
        },
        title: {
          text: 'Presupuesto Total de los Proyectos'
        },
        xAxis: {
          categories: ['$ Presupuesto']  // Puedes cambiar las categorías según los datos disponibles
        },
        yAxis: {
          title: {
            text: 'Monto en Pesos $COP'  // Cambia el título según la unidad de medida
          }
        },
        series: [{
          type: 'line',  // Cambia el tipo de serie a 'line'
          name: 'Total Presupuesto',
          data: [parseFloat(data.total_budget)]  // Asegúrate de que el dato sea numérico
        }]
      };
    });
  }

  loadProjectsByZone(): void {
    this.metricService.getProjectsByZone().subscribe((data: any) => {
      console.log('Projects by Zone:', data);  // Verifica los datos
      this.chartOptionsZone = {
        chart: {
          type: 'pie'  // Cambia el tipo de gráfico a 'pie'
        },
        title: {
          text: 'Proyectos por Zona'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '{point.name}: {point.y:.1f}%'  // Muestra el porcentaje en los datos
            }
          }
        },
        series: [{
          type: 'pie',  // Tipo de serie 'pie'
          name: 'Cantidad de Proyectos',
          data: data.map((item: any) => ([item.zone, item.total]))  // Datos para la serie
        }]
      };
    });
  }
}