import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DashboardListComponent, DashboardDetailComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
