import { Component, AfterViewInit,inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {FlexLayoutModule} from '@angular/flex-layout'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatTableModule} from '@angular/material/table'

import {MatDialogModule} from '@angular/material/dialog'
import { DialogComponent } from '../dialog/dialog.component';
import { Dialog } from '@angular/cdk/dialog';
import Chart from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js';
import { BoxPlotChart } from '@sgratzl/chartjs-chart-boxplot';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatToolbarModule,
    FlexLayoutModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    DialogComponent
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent implements AfterViewInit {

  //constructor(@Inject(Dialog) private dialog: Dialog) { }


  ngAfterViewInit(): void {
    this.Barplot();
    this.regressLine('myChart2'); // Call initializeChart for the second chart
    //this.Boxplot('myChart3')

  }

  Barplot(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // regression line
  regressLine(canvasId: string): void {
    const ctx = document.getElementById('myChart2') as HTMLCanvasElement;

    const data = [
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 4 },
      { x: 3, y: 10 },
      { x: 4, y: 8 },
      { x: 5, y: 18 },
      { x: 6, y: 12 },
      { x: 7, y: 14 }
    ];
    const regressionLine = [0, 2, 4, 6, 8, 10, 12, 14];
  
    const config: ChartConfiguration<'scatter'> = {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Data',
          data: data,
          borderColor: 'rgba(54, 12, 235, 20)',
          backgroundColor: 'rgba(75, 192, 192, 30)',
          showLine: false 
        }, {
          label: 'Regression Line',
          data: regressionLine.map((y, index) => ({ x: index, y: y })),//regressionLine,
          borderColor: 'rgba(255, 99, 132, 10)',
          fill: false,
          showLine: true
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              color: 'white', // Set x-axis label color
              font: {
                size: 16 // Set x-axis label font size
              },
              text: 'X Axis Label' // Set x-axis label text
            },
            ticks: {
              font: {
                size: 18 // Set x-axis tick font size
              }
            }
          },
          y: {
            title: {
              display: true,
              color: 'white', // Set y-axis label color
              font: {
                size: 16 // Set y-axis label font size
              },
              text: 'Y Axis Label' // Set y-axis label text
            },
            ticks: {
              font: {
                size: 18 // Set y-axis tick font size
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'red', // Set legend label color
              font: {
                size: 16 // Set legend label font size
              }
            }
          }
        }
      }
    };
  
  
    new Chart(ctx, config);
  }

  //// boxplot
 


}