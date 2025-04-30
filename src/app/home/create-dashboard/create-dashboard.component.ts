import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddDashboard, SelectDashboard } from 'src/app/state/dashboard.state';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Dashboard } from 'src/app/model/dashboard';

@Component({
  selector: 'app-create-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-dashboard.component.html'
})
export class CreateDashboardComponent {
  form = this.fb.group({
    name: [''],
    charts: this.fb.array([this.createChartGroup()])
  });

  constructor(private fb: FormBuilder, private store: Store, private modal: NgxSmartModalService) {}

  get charts(): FormArray {
    return this.form.get('charts') as FormArray;
  }

  createChartGroup(): FormGroup {
    return this.fb.group({
      name: [''],
      type: ['bar'],
      xField: ['age'],
      yField: ['userCount'],
      aggregation: ['Sum'],
      data: this.fb.array([
        this.fb.group({ age: [''], userCount: [''] })
      ])
    });
  }

  addDataRow(chartIndex: number) {
    const chartGroup = this.charts.at(chartIndex) as FormGroup;
    const dataArray = chartGroup.get('data') as FormArray;
    dataArray.push(this.fb.group({ age: [''], userCount: [''] }));
  }
  

  addChart() {
    this.charts.push(this.createChartGroup());
  }

  submit() {
    const val = this.form.value;
    if (!val.name || !val.charts?.length) return;

    const dashboard: Dashboard = {
      id: 'dashboard-' + Date.now(),
      name: val.name,
      filters: [],
      charts: val.charts.map(c => ({
        ...c,
        id: 'chart-' + Math.random().toString(36).slice(2)
      }))
    };

    this.store.dispatch(new AddDashboard(dashboard));
    this.store.dispatch(new SelectDashboard(dashboard.id));
    this.modal.getModal('createDashboardModal').close();
  }
}
