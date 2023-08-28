import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { withI18nProvider } from '../../utils/with-i18n-provider.js';

import { Table, type TableEntry, type TableProps } from './Table.js';

export const ClientTableComponent = <T extends TableEntry>({ data, ...props }: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const { t } = useTranslation();

  const pageCount = Math.ceil(data.length / entriesPerPage);

  const firstEntry = (currentPage - 1) * entriesPerPage + 1;
  const lastEntry = Math.min(firstEntry + entriesPerPage - 1, data.length);
  const currentEntries = data.slice(firstEntry - 1, lastEntry);

  return (
    <div>
      <Table data={currentEntries} {...props} />
      <div className="py-3 px-1 flex items-center justify-between">
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {t('table.pagination.info', {
              first: firstEntry,
              last: lastEntry,
              total: data.length
            })}
          </p>
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          <button
            className="relative disabled:opacity-75 inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800"
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          >
            {t('table.pagination.previous')}
          </button>
          <button
            className="ml-3 disabled:opacity-75 relative inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800"
            disabled={currentPage === pageCount}
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            {t('table.pagination.next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export const ClientTable = withI18nProvider(ClientTableComponent) as typeof ClientTableComponent;
