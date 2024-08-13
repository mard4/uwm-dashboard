import { Component, AfterViewInit,inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import Chart from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import * as L from 'leaflet';
import { DataService } from "../data.service";
import { DetailedBin, getBinDetails, getBins, getBinStatus, getWeather, getPedestrian, getOptimalPath} from "../../api";
import { Bin, Weather, Pedestrian, OptPath} from "../../api";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
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

  bins: Bin[] = [];
  weather: Weather[] = [];
  pedestrian: Pedestrian[] = [];
  optpath: any = [];
  bins_details: DetailedBin[] = [];
  data: any = [];
  chart: any = [];

  averageTemperature: number = 0;
  averageFillLevel: number = 0;
  averageAirTemp: number = 0;
  lastPrecipitation: number = 0;

  fields: string[] = [];
  selectedField: string = 'temperature';  // Default selected field

  constructor(private dataService: DataService) {}

  async ngOnInit(): Promise<void> {
    this.dataService.getData("/alarms").subscribe((data) => {
      this.data = data;
     
    });

    this.bins = await this.getAllBins();
    this.fields = this.getObjectKeys(this.bins[0]); 

    const detailedPromises = this.bins.map(bin => this.callBinDetails(bin.id));
    const detailsWithUndefined = await Promise.all(detailedPromises);
    this.bins_details = detailsWithUndefined.filter((detail): detail is DetailedBin => detail !== undefined);
    console.log("Bins Details", this.bins_details);
    //console.log("Fields", this.fields);
    this.selectedField = this.fields[0];  // Default to the first field

    this.weather = await this.getAllWeather();
    //console.log("Weather", this.weather);
    this.pedestrian = await this.getAllPedestrian();
    //console.log("Pedestrian", this.pedestrian);
    this.optpath = await this.getOptPath();
    console.log("OptPath", this.optpath);
    let binStatus = await this.callBinStatus(this.bins[0].id);
    console.log("binStatus", binStatus);
    let binDetails = await this.callBinDetails(this.bins[0].id);
    console.log(binDetails);
    this.calculateAverageTemperature();
    this.calculateAverageFillLevel();
    this.calculateAverageAirTemp();
    this.getLastPrecipitation();
    this.Barplot(); 
    this.LineChart();
    this.initMap();

    //this.initPlotly();
    this.updatePlot();

  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  // to get the value of the selected field
  get selectedFieldValue(): string {
    return this.selectedField;
  }

  private async getAllBins(): Promise<Bin[]> {
    let bins: Bin[] = [];
    try {
      bins = await getBins();
      console.log('Got bins data dashboard comp.', JSON.stringify(bins));
    } catch (error) {
      console.error("Error:", error);
    }
    return bins;
  }

  private async getAllWeather(): Promise<Weather[]> {
    let weather: Weather[] = [];
    try {
      weather = await getWeather();
      console.log('Got Weather data dashboard comp.', JSON.stringify(weather));
    } catch (error) {
      console.error("Error:", error);
    }
    return weather;
  }

  private async getAllPedestrian(): Promise<Pedestrian[]> {
    let pedestrian: Pedestrian[] = [];
    try {
      pedestrian = await getPedestrian();
      console.log('Got pedestrian data dashboard comp.', JSON.stringify(pedestrian));
    } catch (error) {
      console.error("Error:", error);
    }
    return pedestrian;
  }

  private async getOptPath(): Promise<any> {
    let optpath: any = [];
    try {
      optpath = await getOptimalPath();
      console.log('optpath DASHBOARD COMP', JSON.stringify(optpath));
    } catch (error) {
      console.error("Error:", error);
    }
    return optpath;
  }

  private async callBinStatus(id: string): Promise<Bin | undefined> {
    let binStatus: Bin | undefined = undefined;
    try {
      binStatus = await getBinStatus(id);
    } catch (error) {
      console.error("Error:", error);
    }
    return binStatus;
  }

  private async callBinDetails(id: string): Promise<DetailedBin | undefined> {
    let binDetails: DetailedBin | undefined = undefined;
    try {
      binDetails = await getBinDetails(id);
    } catch (error) {
      console.error("Error:", error);
    }
    return binDetails;
  }

  // MAP //
  ngAfterViewInit(): void {
    // this.initPlotly();
    // this.initMap();
  }

  private initMap(): void {
    this.icon = L.divIcon({
      html: '📍',
      className: 'custom-div-icon',
      iconSize: [100, 100],
      iconAnchor: [12.5, 12.5]
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
  
    // Loop through the bins_details array and add a marker for each bin
    this.bins_details.forEach(bin => {
      if (bin.latitude && bin.longitude) {
        const marker = L.marker([parseFloat(bin.latitude), parseFloat(bin.longitude)], { icon: this.icon });
        marker.addTo(this.map);
      }
    });
  
    window.addEventListener('resize', () => {
      this.map.invalidateSize();
    });
  
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }
  
  ////////// CHARTS and KPIS //////////
  
  private calculateAverageTemperature(): void {
    const totalTemperature = this.bins.reduce((sum, bin) => sum + Number(bin.temperature), 0);
    this.averageTemperature = totalTemperature / this.bins.length;
    console.log("Average Temperature:", this.averageTemperature);
  }
  
  private calculateAverageFillLevel(): void {
    const totalFill = this.bins.reduce((sum, bin) => sum + Number(bin.fillLevel), 0);
    this.averageFillLevel = totalFill / this.bins.length;
    console.log("Average fillLevel:", this.averageFillLevel);
  }

  private calculateAverageAirTemp(): void {
    const totalTemperature = this.weather.reduce((sum, bin) => sum + Number(bin.airTemp), 0);
    this.averageAirTemp = totalTemperature / this.weather.length;
    console.log("Average Temperature:", this.averageAirTemp);
  }

  private getLastPrecipitation(): void {
    const lastPrecipitation = this.weather[this.weather.length - 1];
    this.lastPrecipitation = lastPrecipitation.precipitation;
    console.log("Last Precipitation:", this.lastPrecipitation);
  }
  
  

  Barplot(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.bins.map(bin => bin.id),
        datasets: [{
          label: 'Fill Level',
          data: this.bins.map(bin => Number(bin.fillLevel)),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
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
  

  private LineChart(): void {
    // const ctx = document.getElementById('myChart2') as HTMLCanvasElement;
    const times = this.pedestrian.map(record => new Date(record.lastEdit).toLocaleTimeString());    
    const numVisitors = this.pedestrian.map(record => Number(record.numVisitors));

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: times,
        datasets: [
          {
            label: 'Number of Visitors',
            data: numVisitors,
            fill: false,
            borderColor: 'blue',
            tension: 0.1
          }
        ]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Visitors'
            }
          }
        }
      }
    });
  }

  private initPlotly(): void {
    const data: Partial<Plotly.Data>[] = [
      {
        x: this.bins.map(bin => bin.id),
        y: this.bins.map(bin => Number(bin[this.selectedField as keyof Bin])),
        type: 'bar'
      }
    ];

    const layout: Partial<Plotly.Layout> = {
      title: {
        text: 'Temperature in Bins',
        font: {
          size: 24  // Increase the font size
        }
      }
    };

    PlotlyJS.newPlot('myDiv', data);
  }

  updatePlot(): void {
    const data: Partial<Plotly.Data>[] = [
      {
        x: this.bins.map(bin => bin.id),
        y: this.bins.map(bin => Number(bin[this.selectedField as keyof Bin])),
        type: 'bar'
      }
    ];
  
    const layout: Partial<Plotly.Layout> = {
      title: {
        text: `Plot for ${this.selectedField}`,
        font: {
          size: 24
        }
      }
    };
  
    PlotlyJS.react('myDiv', data, layout);
  }
  
}
