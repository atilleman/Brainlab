import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DashboardState, AddFilter, RemoveFilter } from 'src/app/state/dashboard.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-filters-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.scss']
})
export class FiltersPanelComponent implements OnInit {
  private store = inject(Store);

  field = '';
  operator = '=';
  value = '';

  activeFilters$: Observable<any[]>;

  ngOnInit() {
    this.activeFilters$ = this.store.select(DashboardState.activeDashboard).pipe(
      map(dashboard => dashboard?.filters || [])
    );
  }

  addFilter() {
    if (this.field && this.operator && this.value !== undefined) {
      this.store.dispatch(new AddFilter({ field: this.field, operator: this.operator, value: this.value }));
      this.field = '';
      this.operator = '=';
      this.value = '';
    }
  }

  removeFilter(index: number) {
    this.store.dispatch(new RemoveFilter(index));
  }
}
