import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersPanelComponent } from './filters-panel/filters-panel.component';
import { ChartWidgetComponent } from './chart-widget/chart-widget.component';
import { Store } from '@ngxs/store';
import { DashboardState } from 'src/app/state/dashboard.state';

@Component({
  selector: 'app-dashboard-detail',
  standalone: true,
  imports: [CommonModule, FiltersPanelComponent, ChartWidgetComponent],
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss']
})
export class DashboardDetailComponent {
  showFilters = false;

  dashboard$ = this.store.select(DashboardState.activeDashboard);

  constructor(private store: Store) {}

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
