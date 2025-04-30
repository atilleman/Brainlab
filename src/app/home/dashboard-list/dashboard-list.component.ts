import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { DashboardState, LoadDashboards, SelectDashboard } from 'src/app/state/dashboard.state';
import { CreateDashboardComponent } from '../create-dashboard/create-dashboard.component';

@Component({
  selector: 'app-dashboard-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSmartModalModule, CreateDashboardComponent],
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent {
  private store = inject(Store);

  dashboards$ = this.store.select(DashboardState.dashboards);
  selectedId: string | null = null;

  constructor(private modalService: NgxSmartModalService) {
    this.store.dispatch(new LoadDashboards());
  }

  selectDashboard() {
    if (this.selectedId) {
      this.store.dispatch(new SelectDashboard(this.selectedId));
    }
  }

  openCreateDashboardModal() {
    this.modalService.getModal('createDashboardModal').open();
  }
}
