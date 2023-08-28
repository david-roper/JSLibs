import React from 'react';

import { toBasicISOString } from '@douglasneuroinformatics/utils';
import { clsx } from 'clsx';

/** Coerces the value in a cell to a string for consistant display purposes */
function defaultFormatter(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'number') {
    return value.toFixed(2).toString();
  } else if (typeof value === 'undefined') {
    return 'NA';
  }
  if (value instanceof Date) {
    return toBasicISOString(value);
  }
  return JSON.stringify(value);
}

export type TableEntry = Record<string, unknown>;

export type FieldFactory<T extends TableEntry = TableEntry> = (entry: T) => string;

export type TableColumn<T extends TableEntry> = {
  /** The label to be displayed on the header */
  label: string;

  /** How to determine the values for column */
  field: keyof T | FieldFactory<T>;

  /** Override the default formatter for this field */
  formatter?: (value: any) => string;
};

export type TableProps<T extends TableEntry> = {
  columns: TableColumn<T>[];
  data: T[];
  onEntryClick?: (entry: T) => void;
};

export const Table = <T extends TableEntry>({ columns, data, onEntryClick }: TableProps<T>) => {
  return (
    <div className="min-w-full overflow-hidden rounded-md shadow-md">
      <div className="overflow-x-scroll w-full scrollbar-none">
        <table className="w-full table-auto">
          <thead className="border-b border-slate-300 bg-slate-50 dark:border-0 dark:bg-slate-700">
            <tr>
              {columns.map((column, i) => (
                <th
                  className="whitespace-nowrap px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 text-left"
                  key={i}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-slate-50 dark:divide-slate-600 divide-y dark:bg-slate-800">
            {data.map((entry, i) => (
              <tr
                className={clsx('whitespace-nowrap p-4 text-sm text-slate-600 dark:text-slate-300', {
                  'cursor-pointer hover:backdrop-brightness-95': typeof onEntryClick === 'function'
                })}
                key={i}
                onClick={() => {
                  onEntryClick && onEntryClick(entry);
                }}
              >
                {columns.map(({ field, formatter }, j) => {
                  const value = typeof field === 'function' ? field(entry) : entry[field];
                  const formattedValue = formatter ? formatter(value) : defaultFormatter(value);
                  return (
                    <td className="whitespace-nowrap px-6 py-3" key={j}>
                      <span>{formattedValue}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
