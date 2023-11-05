import { range, toBasicISOString } from '@douglasneuroinformatics/utils';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type ColumnDropdownOptions, TableColumnHeader } from './TableColumnHeader';

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
  /** How to determine the values for column */
  field: FieldFactory<T> | keyof T;

  /** Override the default formatter for this field */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatter?: (value: any) => string;

  /** The label to be displayed on the header */
  label: string;
};

export type TableProps<T extends TableEntry> = {
  className?: string;
  columnDropdownOptions?: ColumnDropdownOptions<T>;
  columns: TableColumn<T>[];
  data: T[];
  minRows?: number;
  onEntryClick?: (entry: T) => void;
};

export const Table = <T extends TableEntry>({
  className,
  columnDropdownOptions,
  columns,
  data,
  minRows,
  onEntryClick
}: TableProps<T>) => {
  return (
    <div className={twMerge('min-w-full overflow-hidden rounded-md shadow dark:bg-slate-800 bg-slate-50', className)}>
      <div className="overflow-x-scroll w-full">
        <table className="w-full table-auto">
          <thead className="border-b border-slate-300 bg-slate-50 dark:border-0 dark:bg-slate-700">
            <tr>
              {columns.map((column, i) => (
                <th
                  className="whitespace-nowrap text-sm  font-semibold text-slate-800 dark:text-slate-200 text-left"
                  key={i}
                >
                  <TableColumnHeader column={column} dropdownOptions={columnDropdownOptions} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="dark:divide-slate-600 divide-y">
            {range(Math.max(data.length, minRows ?? -1)).map((i) => {
              const entry = data[i];
              return (
                <tr
                  className={clsx('whitespace-nowrap p-4 text-sm text-slate-600 dark:text-slate-300', {
                    'cursor-pointer hover:backdrop-brightness-95': entry && typeof onEntryClick === 'function'
                  })}
                  key={i}
                  onClick={() => {
                    entry && onEntryClick && onEntryClick(entry);
                  }}
                >
                  {columns.map(({ field, formatter }, j) => {
                    let value: unknown;
                    if (!entry) {
                      value = '';
                    } else if (typeof field === 'function') {
                      value = field(entry);
                    } else {
                      value = entry[field];
                    }
                    const formattedValue = formatter ? formatter(value) : defaultFormatter(value);
                    return (
                      <td className="whitespace-nowrap px-6" key={j} style={{ height: 42 }}>
                        <span className="text-ellipsis block leading-none">{formattedValue}</span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
