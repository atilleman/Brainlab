import { Injectable } from '@angular/core';
import { ChartData } from '../model/chartData';
import { ChartSampleData } from '../data/chartSampleData';

@Injectable({
  providedIn: 'root'
})

export class ChartService {

  constructor() {}

  getChartDefaultData():  ChartData[] {
    const mockData: ChartData[] = ChartSampleData;
    return mockData;
  }
}

