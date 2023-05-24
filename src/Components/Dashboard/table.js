import React, { useState, Fragment } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import ContentLoader from "react-content-loader";
const RepeatableTableRows = props => {
  const { rows = 10 } = props
  const rowHeight = 60

  return (
    <ContentLoader viewBox={`0 0 1500 ${rowHeight * rows}`} {...props}>
      {new Array(rows).fill(' ').map((el, index) => {
        const contentVerticalPosition = contentHeight =>
          rows > 1 ? contentHeight + rowHeight * index : contentHeight
        return (
          <Fragment key={index}>
            <rect
              x="20"
              y={`${contentVerticalPosition(20)}`}
              rx="4"
              ry="4"
              width="40"
              height="20"
            />
            <rect
              x="100"
              y={`${contentVerticalPosition(20)}`}
              rx="10"
              ry="4"
              width="600"
              height="20"
            />
            <rect
              x="750"
              y={`${contentVerticalPosition(20)}`}
              rx="10"
              ry="4"
              width="600"
              height="20"
            />
            <rect
              x="1450"
              y={`${contentVerticalPosition(20)}`}
              rx="4"
              ry="4"
              width="20"
              height="20"
            />
            <rect
              y={`${contentVerticalPosition(59)}`}
              x="10"
              ry="10"
              width="1500"
              height="1"
            />
          </Fragment>
        )
      })}
    </ContentLoader>
  )
}

const Table = ({ columns, data, loading }) => {
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div className="m-2 w-full overflow-hidden border-b border-gray-200 shadow sm:rounded-lg ">
      <table className="min-w-full divide-y text-left text-sm">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {loading ? (
            <tr>
              <td key="0" colSpan={columns.length}><RepeatableTableRows /></td>
            </tr>
            

          ) : ( <>
            {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr key={row.id} className="font-normal">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="whitespace-nowrap px-6 py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </>
           
          )}
          
        </tbody>
        
      </table>
    </div>
  );
};

export default Table;
