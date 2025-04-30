import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-dashboard-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1 mat-dialog-title>Create New Dashboard</h1>
    <div mat-dialog-content>
      <input [(ngModel)]="dashboardName" placeholder="Dashboard Name" />
    </div>
    <div mat-dialog-actions>
      <button (click)="cancel()">Cancel</button>
      <button (click)="create()">Create</button>
    </div>
  `
})
export class CreateDashboardDialogComponent {
  dashboardName = '';

  constructor(private dialogRef: MatDialogRef<CreateDashboardDialogComponent>) {}

  cancel() {
    this.dialogRef.close();
  }

  create() {
    this.dialogRef.close(this.dashboardName.trim());
  }
}
