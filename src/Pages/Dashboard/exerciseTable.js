import React, { useState, Fragment, useMemo } from "react";
import {
  Column,
  ColumnDef,
  Table as ReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  OnChangeFn,
  useReactTable,
} from "@tanstack/react-table";
import { columnsExercise } from "./tableModels";
import ContentLoader from "react-content-loader";

const RepeatableTableRows = (props) => {
  const { rows = 20 } = props;
  const rowHeight = 60;

  return (
    <ContentLoader viewBox={`0 0 1500 ${rowHeight * rows}`} {...props}>
      {new Array(rows).fill(" ").map((el, index) => {
        const contentVerticalPosition = (contentHeight) =>
          rows > 1 ? contentHeight + rowHeight * index : contentHeight;
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
        );
      })}
    </ContentLoader>
  );
};

const ExerciseTable = ({ data, loading, openModal, auth }) => {
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(() => columnsExercise, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    //
    debugTable: true,
  });

  return (
    <div className="m-auto flex max-w-[1600px] flex-grow overflow-y-hidden">
      <div className="flex flex-col w-full ">
        <div className="flex flex-row justify-between gap-1 mx-2">
          <div></div>
          <div></div>
          <button
            type="button"
            onClick={openModal}
            disabled={auth.authStatus !== "signedIn"}
            className={
              "inline-flex w-fit items-center rounded-md border-2 border-blue-200 bg-blue-50 px-2.5 py-1.5 font-bold text-blue-600 transition duration-200 hover:bg-blue-100 hover:shadow " +
              (auth.authStatus !== "signedIn"
                ? "cursor-not-allowed opacity-50"
                : "")
            }
          >
            <svg
              aria-hidden="true"
              className="w-3 h-3 mr-1"
              height="12"
              width="12"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              stroke="currentColor"
            >
              <path
                d="M9 7h6a1 1 0 0 1 0 2H9v6a1 1 0 0 1-2 0V9H1a1 1 0 1 1 0-2h6V1a1 1 0 1 1 2 0z"
                fill-rule="evenodd"
              ></path>
            </svg>
            <span className="text-sm">New Exercise</span>
          </button>
        </div>

        <div className="h-full m-2 overflow-auto border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full text-sm text-left divide-y bg-blue-800/10">
            <thead className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
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
            <tbody className="bg-white divide-y divide-gray-200 table-scroll">
              {loading ? (
                <tr>
                  <td key="0" colSpan={columns.length}>
                    <RepeatableTableRows />
                  </td>
                </tr>
              ) : (
                <>
                  {table
                    .getRowModel()
                    .rows.slice(0, 10)
                    .map((row) => {
                      return (
                        <tr key={row.id} className="font-normal">
                          {row.getVisibleCells().map((cell) => {
                            return (
                              <td
                                key={cell.id}
                                className="px-6 py-4 whitespace-nowrap"
                              >
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

        <div className="flex flex-row justify-between gap-1 mx-2 mt-2">
          <div className="flex gap-1">
            <select
              className="pl-2 text-sm font-semibold text-white bg-blue-400 border border-gray-300 rounded-full cursor-pointer focus:border-blue-500 focus:outline-blue-500"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div> </div>
          <div className="flex gap-1">
            <button
              className={
                "rounded-full bg-blue-400 px-4 py-2 text-sm font-semibold text-white shadow-sm " +
                (!table.getCanPreviousPage()
                  ? "cursor-not-allowed opacity-50"
                  : "")
              }
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Prev
            </button>
            <span className="flex items-center gap-1 mx-2 text-sm font-semibold text-blue-500 ">
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <button
              className={
                "rounded-full bg-blue-400 px-4 py-2 text-sm font-semibold text-white shadow-sm " +
                (!table.getCanNextPage() ? "cursor-not-allowed opacity-50" : "")
              }
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseTable;
