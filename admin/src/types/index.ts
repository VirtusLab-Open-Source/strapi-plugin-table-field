export type TableRow = Array<string>;

export type TableColumn = {
  label: string;
  type: string;
  required: boolean;
};

export type TableData = {
  rows: Array<TableRow>;
  columns: Array<TableColumn>;
};
