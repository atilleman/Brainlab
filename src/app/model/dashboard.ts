import { ChartWidget, FilterClause } from "../state/dashboard.state";

export interface Dashboard {
  id: string;
  name: string | null | undefined;
  charts: ChartWidget[];
  filters: FilterClause[];
}
