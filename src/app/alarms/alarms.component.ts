import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import {
  MatDialogModule,
  MatDialog,
  MatDialogConfig,
} from "@angular/material/dialog"; // Correcting the import here
import { DialogComponent } from "../dialog/dialog.component";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { DataService } from "../data.service";
import {
  DetailedBin,
  getBinDetails,
  getBins,
  getBinStatus,
  exportBinInCsv,
  exportBinsInCsv,
} from "../../api";
import { Bin } from "../../api";

@Component({
  selector: "app-alarms",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatTabsModule,
    MatTableModule,
    DialogComponent,
    MatIconModule,
  ],
  providers: [DataService],
  templateUrl: "./alarms.component.html",
  styleUrls: ["./alarms.component.css"], // Corrected from `styleUrl` to `styleUrls`
})
export class AlarmsComponent {
  bins: Bin[] = [];
  data: any = [];

  columnsToDisplay: string[] = [
    "id",
    "lastEdit",
    "temperature",
    "fillLevel",
    "battery",
  ];

  constructor(private dataService: DataService, public dialog: MatDialog) {} // Changed to MatDialog

  async ngOnInit(): Promise<void> {
    this.dataService.getData("/alarms").subscribe((data) => {
      this.data = data;
      // console.log("data", this.data);
    });
    this.bins = await getAllBins();
    let binStatus = callBinStatus(this.bins[0].id);
    let binDetails = callBinDetails(this.bins[0].id);
    // exportBin(this.bins[0].id);
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  async exportBin(id: string): Promise<void> {
    try {
      await exportBinInCsv(id);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async exportBins(): Promise<void> {
    try {
      await exportBinsInCsv();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  openDialog(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "custom-dialog-container"; // Apply custom CSS class

    dialogConfig.position = {
      top: "-100",
      left: "90",
    };
    this.dialog.open(DialogComponent, {
      data: { item: item },
    });
  }
}

async function getAllBins(): Promise<Bin[]> {
  let bins: Bin[] = [];
  try {
    bins = await getBins();
    console.log("bins", JSON.stringify(bins));
  } catch (error) {
    console.error("Error:", error);
  } finally {
    return bins;
  }
}

async function callBinStatus(id: string): Promise<Bin | undefined> {
  let binStatus: Bin | undefined = undefined;
  try {
    binStatus = await getBinStatus(id);
  } catch (error) {
    console.error("Error:", error);
  }
  return binStatus;
}

async function callBinDetails(id: string): Promise<DetailedBin | undefined> {
  let binDetails: DetailedBin | undefined = undefined;
  try {
    binDetails = await getBinDetails(id);
  } catch (error) {
    console.error("Error:", error);
  }
  return binDetails;
}
