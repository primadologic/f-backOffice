"use client"
import React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronDown, ListFilter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"





interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const [columnVisibility, setColumnVisibility] =
  React.useState<VisibilityState>({})
const [rowSelection, setRowSelection] = React.useState({})

const [pagination, setPagination] = useState({
  pageIndex: 0, //initial page index
  pageSize: 15, //default page size
});
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), 
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    },
  });

  return (
    <div className="">
      <Card className="rounded-[1.8rem] border">
        <div className="w-full flex sm:flex-row flex-col justify-between items-center">
          <CardHeader className="">
            <CardTitle className="font-semibold dark:text-custom_theme-primary_background">Fraud Numbers List</CardTitle>
            <CardDescription className="dark:text-custom_theme-gray font-medium">Keep track of reported fraud numbers and other information</CardDescription>
          </CardHeader>
            <CardContent className="flex gap-3 ">
              <div className="flex items-center gap-4 py-4">
              <div className="relative w-full max-w-md ">
                <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                <Input
                  placeholder="Filter fraud number"
                  value={(table.getColumn("fraudNumber")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("fraudNumber")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm pl-10 focus-visible:ring-1 focus-visible:ring-gray-400 outline-none focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300"
                />
              </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild  className="">
                    <Button variant="outline" className="ml-auto focus-visible:ring-1 focus-visible:ring-gray-400 outline-none focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300">
                      <ListFilter />
                      Filter <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Columns</DropdownMenuLabel>
                      {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                          return (
                            <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                              }
                            >
                              {column.id}
                            </DropdownMenuCheckboxItem>
                          )
                        })}
                      </DropdownMenuGroup>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Approved</DropdownMenuLabel>
                        {[true, false].map((approvedOption) => {
                          const column = table.getColumn("approved");
                          const currentFilter = column?.getFilterValue() as boolean | undefined;
                          const isChecked = currentFilter === approvedOption;

                          return (
                          <DropdownMenuCheckboxItem
                            key={approvedOption.toString()}
                            className="capitalize"
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              if (!column) return;
                              column.setFilterValue(checked ? approvedOption : undefined) // Set or Clear filter
                            }}
                            >
                              { approvedOption.toString() }
                            </DropdownMenuCheckboxItem>
                          );
                        })}
                      </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>

        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 px-6 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>

      </Card>
    </div>
  )
}
