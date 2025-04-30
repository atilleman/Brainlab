export interface Filter {
  fieldName: string;
  operator: 'includes' | '>' | '<' | '=' | '!=' | 'contains';
  value: any;
}
