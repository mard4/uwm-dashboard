import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlarmsComponent } from './alarms/alarms.component';

export const routes: Routes = [
    //{path:'', component:DashboardComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'alarms', component:AlarmsComponent},
];
