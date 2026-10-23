import { type ReactNode } from 'react';
import { mergeClassNames } from '../utils';

export type DataTableRow = Record<string, unknown>;

export interface DataTableColumn<T extends object = DataTableRow> {
  key: keyof T & string;
  header: ReactNode;
  render?: (row: T) => ReactNode;
  className?: string;
}

export interface DataTableProps<T extends object = DataTableRow> {
  columns: DataTableColumn<T>[];
  rows: T[];
  caption?: ReactNode;
  empty?: ReactNode;
  className?: string;
  getRowKey?: (row: T, index: number) => string;
}

const TABLE_CLASS = 'w-full border-collapse text-sm';
const CAPTION_CLASS = 'mb-2 text-left text-sm text-muted-foreground';
const HEADER_CELL_CLASS = 'border-b border-border px-3 py-2 text-left font-medium text-foreground';
const BODY_CELL_CLASS = 'border-b border-border px-3 py-2 text-foreground';
const EMPTY_CELL_CLASS = 'px-3 py-6 text-center text-muted-foreground';

function cellContent<T extends object>(row: T, column: DataTableColumn<T>): ReactNode {
  if (column.render) {
    return column.render(row);
  }

  const value = (row as Record<string, unknown>)[column.key];

  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  if (typeof value === 'boolean') {
    return String(value);
  }

  return null;
}

export default function DataTable<T extends object = DataTableRow>({
  columns,
  rows,
  caption,
  empty,
  className,
  getRowKey,
}: DataTableProps<T>) {
  return (
    <table className={mergeClassNames(TABLE_CLASS, className)}>
      {caption ? <caption className={CAPTION_CLASS}>{caption}</caption> : null}
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} scope="col" className={mergeClassNames(HEADER_CELL_CLASS, column.className)}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className={EMPTY_CELL_CLASS}>
              {empty}
            </td>
          </tr>
        ) : (
          rows.map((row, index) => (
            <tr key={getRowKey ? getRowKey(row, index) : String(index)}>
              {columns.map((column) => (
                <td key={column.key} className={mergeClassNames(BODY_CELL_CLASS, column.className)}>
                  {cellContent(row, column)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
