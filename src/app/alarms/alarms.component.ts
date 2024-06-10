import { Component, inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog'
import { DialogComponent } from '../dialog/dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table'
import { Dialog } from '@angular/cdk/dialog';
import { DataService } from '../data.service';


@Component({
  selector: 'app-alarms',
  standalone: true,
  imports: [MatCardModule,
            MatDialogModule,
            DialogComponent,
            CommonModule,
            MatTooltipModule,
            MatTabsModule,
            MatTableModule
  ],
  providers: [DataService],
  templateUrl: './alarms.component.html',
  styleUrl: './alarms.component.css'
})
export class AlarmsComponent {
  data: any = [];
  data2 = [
    { dev_id: '1', time: '2022-06-10 10:00', temperature: 25, distance: 10, filllevel: 50, battery: 80, latitude: 40.7128, longitude: -74.0060, sensor_name: 'Sensor A' },
    { dev_id: '2', time: '2022-06-10 10:15', temperature: 22, distance: 12, filllevel: 70, battery: 60, latitude: 34.0522, longitude: -118.2437, sensor_name: 'Sensor B' },
    // Add more data as needed
  ];
  columnsToDisplay: string[] = ['dev_id', 'time', 'temperature', 'distance', 'filllevel', 'battery', 'latitude', 'longitude', 'sensor_name'];


  constructor(private dataService: DataService, public dialog: Dialog) {}

  ngOnInit(): void {
    this.dataService.getData('./data/live.json').subscribe((data) => {
      this.data = data;
      console.log(this.data);
    });
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  openDialog(item: any) {
    this.dialog.open(DialogComponent, {
      data: {
        item: item
      }
    });
  }
}
