import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';

import { DialogComponent } from './dialog/dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlarmsComponent } from './alarms/alarms.component';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
           RouterLink,
           RouterLinkActive,
           DialogComponent,
           DashboardComponent,
           AlarmsComponent,
           FlexLayoutModule,
           MatToolbar,
           MatSidenavModule,
           MatListModule,
           MatButtonModule,
           //BrowserAnimationsModule,
           MatIconModule
           ],
  providers: [DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dsh';
  showFiller = false;



}
