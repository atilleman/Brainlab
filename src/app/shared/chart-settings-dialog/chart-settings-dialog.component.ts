import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chart-settings-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1 mat-dialog-title>Edit Chart Settings</h1>
    <div mat-dialog-content>
      <input [(ngModel)]="chart.customName" placeholder="Custom Name" />
      <select [(ngModel)]="chart.aggregation">
        <option value="Count">Count</option>
        <option value="Sum">Sum</option>
        <option value="Average">Average</option>
        <option value="DistinctCount">Distinct Count</option>
      </select>
    </div>
    <div mat-dialog-actions>
      <button (click)="cancel()">Cancel</button>
      <button (click)="save()">Save</button>
    </div>
  `
})
export class ChartSettingsDialogComponent {
  chart = inject(MAT_DIALOG_DATA).chart;
  private dialogRef = inject(MatDialogRef<ChartSettingsDialogComponent>);

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.chart);
  }
}
