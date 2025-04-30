import { Dashboard } from "../model/dashboard";

export const DashboardSampleData: Dashboard[] = [
  {
    id: 'dashboard1',
    name: 'Main Dashboard',
    filters: [],
    charts: [
      {
        id: 'chart1',
        type: 'line',
        name: 'Users by Age',
        xField: 'age',
        yField: 'userCount',
        aggregation: 'Count',
        customName: 'User Distribution by Age'
      },
      {
        id: 'chart2',
        type: 'bar',
        name: 'Users by Age',
        xField: 'age',
        yField: 'userCount',
        aggregation: 'Count',
        customName: 'User Distribution by Age'
      },
      {
        id: 'chart3',
        type: 'pie',
        name: 'Users by Age',
        xField: 'age',
        yField: 'userCount',
        aggregation: 'Count',
        customName: 'User Distribution by Age'
      },
    ],
  }
];
