import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog,MatDialogConfig } from '@angular/material/dialog'; // Correcting the import here
import { DialogComponent } from '../dialog/dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { DataService } from '../data.service';

@Component({
  selector: 'app-alarms',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatTabsModule,
    MatTableModule,
    DialogComponent,
  ],
  providers: [DataService],
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.css'], // Corrected from `styleUrl` to `styleUrls`
})
export class AlarmsComponent {
  data: any = [];
  data2 = [
    {
      dev_id: '1',
      time: '2022-06-10 10:00',
      temperature: 25,
      distance: 10,
      filllevel: 50,
      battery: 80,
      latitude: 40.7128,
      longitude: -74.0060,
      sensor_name: 'Sensor A',
    },
    {
      dev_id: '2',
      time: '2022-06-10 10:15',
      temperature: 22,
      distance: 12,
      filllevel: 70,
      battery: 60,
      latitude: 34.0522,
      longitude: -118.2437,
      sensor_name: 'Sensor B',
    },
    // Add more data as needed
  ];
  columnsToDisplay: string[] = ['dev_id', 'time', 'temperature', 'distance', 'filllevel', 'battery', 'latitude', 'longitude', 'sensor_name'];

  constructor(private dataService: DataService, public dialog: MatDialog) {} // Changed to MatDialog

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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'custom-dialog-container'; // Apply custom CSS class

    dialogConfig.position = {
      'top': '-100',
      left: '90'
    };
    this.dialog.open(DialogComponent, {
      data: {item:item}, 
    });
  }
}
