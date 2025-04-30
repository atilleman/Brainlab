import { State, Action, Selector, StateContext } from '@ngxs/store';
import { inject, Injectable } from '@angular/core';
import { createSelector } from '@ngxs/store';
import { Dashboard } from '../model/dashboard';
import { DashboardService } from '../services/dashboard-service';

export interface ChartWidget {
  id: string;
  type: 'line' | 'bar' | 'pie';
  name: string;
  customName?: string;
  xField: string;
  yField: string;
  aggregation: string;
}

export interface FilterClause {
  field: string;
  operator: string;
  value: any;
}

export interface DashboardStateModel {
  dashboards: Dashboard[];
  activeDashboardId: string | null;
}

// Actions
export class LoadDashboards {
  static readonly type = '[Dashboard] Load';
}

export class SelectDashboard {
  static readonly type = '[Dashboard] Select';
  constructor(public dashboardId: string) {}
}

export class AddDashboard {
  static readonly type = '[Dashboard] Add';
  constructor(public dashboard: Dashboard) {}
}

export class UpdateChartSettings {
  static readonly type = '[Dashboard] Update Chart Settings';
  constructor(public chartId: string, public updatedChart: Partial<ChartWidget>) {}
}

export class AddFilter {
  static readonly type = '[Dashboard] Add Filter';
  constructor(public filter: FilterClause) {}
}

export class RemoveFilter {
  static readonly type = '[Dashboard] Remove Filter';
  constructor(public index: number) {}
}

// State Definition
@State<DashboardStateModel>({
  name: 'dashboard',
  defaults: {
    dashboards: [],
    activeDashboardId: null
  }
})
@Injectable()
export class DashboardState {
  @Selector()
  static dashboards(state: DashboardStateModel): Dashboard[] {
    return state.dashboards;
  }

  @Selector()
  static activeDashboard(state: DashboardStateModel): Dashboard | undefined {
    return state.dashboards.find(d => d.id === state.activeDashboardId);
  }

  static chartById(chartId: string) {
    return createSelector([DashboardState], (state: DashboardStateModel) => {
      const dashboard = state.dashboards.find(d => d.id === state.activeDashboardId);
      return dashboard?.charts.find(chart => chart.id === chartId);
    });
  }

  static filters() {
    return createSelector([DashboardState], (state: DashboardStateModel) =>
      state.dashboards.find(d => d.id === state.activeDashboardId)?.filters || []
    );
  }

  // Actions
  @Action(LoadDashboards)
  loadDashboards(ctx: StateContext<DashboardStateModel>) {
    const dashboardService = inject(DashboardService);
    const dashboards: Dashboard[] = dashboardService.getDashboards();
    ctx.patchState({ dashboards });
  }

  @Action(SelectDashboard)
  selectDashboard(ctx: StateContext<DashboardStateModel>, action: SelectDashboard) {
    ctx.patchState({ activeDashboardId: action.dashboardId });
  }

  @Action(AddDashboard)
  addDashboard(ctx: StateContext<DashboardStateModel>, action: AddDashboard) {
    const state = ctx.getState();
    ctx.patchState({
      dashboards: [...state.dashboards, action.dashboard]
    });
  }

  @Action(UpdateChartSettings)
  updateChartSettings(ctx: StateContext<DashboardStateModel>, action: UpdateChartSettings) {
    const state = ctx.getState();
    const dashboards = [...state.dashboards];
    const index = dashboards.findIndex(d => d.id === state.activeDashboardId);
    if (index === -1) return;

    const dashboard = dashboards[index];
    const updatedCharts = dashboard.charts.map(chart =>
      chart.id === action.chartId ? { ...chart, ...action.updatedChart } : chart
    );

    dashboards[index] = { ...dashboard, charts: updatedCharts };
    ctx.patchState({ dashboards });
  }

  @Action(AddFilter)
  addFilter(ctx: StateContext<DashboardStateModel>, action: AddFilter) {
    const state = ctx.getState();
    const dashboards = [...state.dashboards];
    const index = dashboards.findIndex(d => d.id === state.activeDashboardId);
    if (index === -1) return;

    const dashboard = dashboards[index];
    const updatedFilters = [...dashboard.filters, action.filter];

    dashboards[index] = { ...dashboard, filters: updatedFilters };
    ctx.patchState({ dashboards });
  }

  @Action(RemoveFilter)
  removeFilter(ctx: StateContext<DashboardStateModel>, action: RemoveFilter) {
    const state = ctx.getState();
    const dashboards = [...state.dashboards];
    const index = dashboards.findIndex(d => d.id === state.activeDashboardId);
    if (index === -1) return;

    const dashboard = dashboards[index];
    const updatedFilters = dashboard.filters.filter((_, i) => i !== action.index);

    dashboards[index] = { ...dashboard, filters: updatedFilters };
    ctx.patchState({ dashboards });
  }
}
