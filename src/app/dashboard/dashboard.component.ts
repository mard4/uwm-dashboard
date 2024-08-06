import { Component, AfterViewInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import Chart from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import * as L from 'leaflet';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    FlexLayoutModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    DialogComponent,
    MatCardModule,
    PlotlyModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  private map!: L.Map;
  private icon!: L.DivIcon;

  constructor() { }

  ngAfterViewInit(): void {
    this.Barplot();
    this.regressLine('myChart2');
    this.initPlotly();
    this.initMap();
  }

  private initMap(): void {
    // Create a custom DivIcon with an emoji
    this.icon = L.divIcon({
      html: '📍',  // Use your desired emoji here
      className: 'custom-div-icon',
      iconSize: [60, 60],
      iconAnchor: [12.5, 12.5]  // Center the icon
    });

    this.map = L.map('map', {
      center: [-37.8026719, 144.9654493],
      zoom: 17,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      keyboard: false
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    // Add a marker with the custom DivIcon
    const marker = L.marker([-37.80249865799543, 144.9661350929003], { icon: this.icon });
    marker.addTo(this.map);

    // Use window resize event to ensure the map resizes properly after view has been initialized
    window.addEventListener('resize', () => {
      this.map.invalidateSize();
    });

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0); // Ensures the map correctly sizes itself
  }

  Barplot(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Bin1', 'Bin2', 'Bin3', 'Bin4', 'Bin5', 'Bin6'],
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

  regressLine(canvasId: string): void {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;

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
          label: 'Temperature Line',
          data: regressionLine.map((y, index) => ({ x: index, y: y })),
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
              color: 'white',
              font: {
                size: 16
              },
              text: 'X Axis Label'
            },
            ticks: {
              font: {
                size: 18
              }
            }
          },
          y: {
            title: {
              display: true,
              color: 'white',
              font: {
                size: 16
              },
              text: 'Y Axis Label'
            },
            ticks: {
              font: {
                size: 18
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'red',
              font: {
                size: 16
              }
            }
          }
        }
      }
    };

    new Chart(ctx, config);
  }

  initPlotly(): void {
    const data: Partial<Plotly.Data>[] = [
      {
        x: ['giraffes', 'orangutans', 'monkeys'],
        y: [20, 14, 23],
        type: 'bar'
      }
    ];

    PlotlyJS.newPlot('myDiv', data);
  }
}
