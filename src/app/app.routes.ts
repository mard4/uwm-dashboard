import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AlarmsComponent } from "./alarms/alarms.component";
import { WelcomeComponent } from "./welcome/welcome.component";

export const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "welcome", component: WelcomeComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "alarms", component: AlarmsComponent },
];
// <a [routerLink]="['/products', productID]">View Product</a>
