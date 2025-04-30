import { Component, Input, inject, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Store } from '@ngxs/store';
import { DashboardState, UpdateChartSettings } from 'src/app/state/dashboard.state';
import { map, combineLatest, Observable } from 'rxjs';
import { DialogService } from 'src/app/shared/dialog.service';
import { ChartWidget } from 'src/app/state/dashboard.state';
import { ChartService } from 'src/app/services/chart-service';

@Component({
  selector: 'app-chart-widget',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss']
})
export class ChartWidgetComponent implements OnChanges {
  @Input() chartId!: string;

  private store = inject(Store);
  private dialogService = inject(DialogService);
  private chartService = inject(ChartService);

  chart$!: Observable<ChartWidget | undefined>;
  filters$ = this.store.select(DashboardState.filters());
  data$!: Observable<any>;

  ngOnChanges() {
    if (!this.chartId) return;
    this.chart$ = this.store.select(DashboardState.chartById(this.chartId));

    this.data$ = combineLatest([this.chart$, this.filters$]).pipe(
      map(([chart, filters]) => {
        if (!chart) return null;

        const rawData = chart['data']?.length
          ? chart['data']
          : this.chartService.getChartDefaultData();

        const filteredData = rawData.filter(record =>
          filters.every(filter => {
            const val = record[filter.field];
            switch (filter.operator) {
              case '=':
                return val == filter.value;
              case '!=':
                return val != filter.value;
              case '>':
                return Number(val) > Number(filter.value);
              case '<':
                return Number(val) < Number(filter.value);
              case 'contains':
                return (val + '').toLowerCase().includes((filter.value + '').toLowerCase());
              default:
                return true;
            }
          })
        );

        let dataSeries: any[] = [];
        let categories: any[] = [];

        if (chart.aggregation === 'Average') {
          const grouped: { [key: string]: number[] } = {};
          filteredData.forEach(record => {
            const key = record[chart.xField];
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(record[chart.yField]);
          });

          categories = Object.keys(grouped);
          dataSeries = categories.map(key => {
            const values = grouped[key];
            const avg = values.reduce((a, b) => a + b, 0) / values.length;
            return avg;
          });
        } else if (chart.aggregation === 'Sum') {
          const grouped: { [key: string]: number } = {};
          filteredData.forEach(record => {
            const key = record[chart.xField];
            grouped[key] = (grouped[key] || 0) + record[chart.yField];
          });

          categories = Object.keys(grouped);
          dataSeries = categories.map(key => grouped[key]);
        } else {
          categories = filteredData.map(r => r[chart.xField]);
          dataSeries = filteredData.map(r => r[chart.yField]);
        }

        if (chart.type === 'pie') {
          return {
            series: dataSeries,
            labels: categories,
            type: chart.type,
            title: chart.customName || chart.name
          };
        } else {
          return {
            series: [{ name: chart.yField, data: dataSeries }],
            xaxis: { categories },
            type: chart.type,
            title: chart.customName || chart.name
          };
        }
      })
    );
  }

  async openSettings() {
    const chart = this.store.selectSnapshot(DashboardState.chartById(this.chartId));
    if (!chart) return;

    const updatedChart = await this.dialogService.openChartSettingsDialog(chart).toPromise();
    if (updatedChart) {
      this.store.dispatch(new UpdateChartSettings(this.chartId, updatedChart));
    }
  }
}
