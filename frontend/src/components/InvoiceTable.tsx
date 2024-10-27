import { format } from 'date-fns';
import { parseISO } from 'date-fns/parseISO';

import React from 'react';
import { useTable, Column } from 'react-table';

interface InvoiceTableProps {
  invoices: any[];
  onDownload: (invoiceId: number) => void;
}
//TODO REPLACE ANY IN PROPS AND LINE 15 TO A PROPER INVOICE INTERFACE
const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices, onDownload }) => {
  const data = React.useMemo(() => invoices, [invoices]);

  const columns = React.useMemo<Column<any>[]>(
    () => [
      {
        Header: 'Client Number',
        accessor: 'clientNumber',
      },
      {
        Header: 'Reference Month',
        accessor: (row: { referenceMonth: string; }) => format(parseISO(row.referenceMonth), 'dd/MM/yyyy'),
        id: 'referenceMonth',
      },
      {
        Header: 'Installation Number',
        accessor: 'instalationNumber',
      },
      {
        Header: 'Download',
        Cell: ({ row }: { row: { original: any } }) => (
          <button onClick={() => onDownload(row.original.id)}>Download PDF</button>
        ),
      },
    ],
    [onDownload]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<any>({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue', width: '100%' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} style={{ background: '#f0f0f0' }}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{ borderBottom: 'solid 3px red', padding: '10px' }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} style={{ borderBottom: 'solid 1px gray' }}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  style={{ padding: '10px', border: 'solid 1px gray' }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
