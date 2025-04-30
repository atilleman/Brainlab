import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDashboardDialogComponent } from './create-dashboard-dialog/create-dashboard-dialog.component';
import { ChartSettingsDialogComponent } from './chart-settings-dialog/chart-settings-dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private dialog = inject(MatDialog);

  openCreateDashboardDialog() {
    return this.dialog.open(CreateDashboardDialogComponent, {
      width: '400px'
    }).afterClosed();
  }

  openChartSettingsDialog(chart: any) {
    return this.dialog.open(ChartSettingsDialogComponent, {
      width: '600px',
      data: { chart }
    }).afterClosed();
  }
}
