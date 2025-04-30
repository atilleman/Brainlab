export interface Chart {
  id: string;
  type: 'bar' | 'line' | 'pie';
  name: string;
  description?: string;
  xField: string;
  yField: string;
  aggregation: 'count' | 'distinctCount' | 'sum' | 'average';
}
