import { Injectable } from '@angular/core';
import { DashboardSampleData } from '../data/dashboardSampleData';
import { Dashboard } from '../model/dashboard';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor() {}

  getDashboards():  Dashboard[] {
    const mockData: Dashboard[] = DashboardSampleData;
    return mockData;
  }
}

