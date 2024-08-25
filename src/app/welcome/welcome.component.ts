import { Component } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialog, MatDialogModule, MatDialogActions, MatDialogContent, MatDialogClose } from "@angular/material/dialog";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-welcome",
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatTooltipModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatDialogModule
  ],
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"],
})
export class WelcomeComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogContentExampleDialog);
  }
}

@Component({
  selector: 'other-informations-dialog',
  templateUrl: 'other-informations-dialog.html',
})
export class DialogContentExampleDialog {
  constructor(public dialog: MatDialog) {}

  closeDialog() {
    this.dialog.closeAll();
  }
}