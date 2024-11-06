"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <div className="bg-white" style={{backgroundColor:"white", zIndex:"1000"}}>
      <DropdownMenuContent align="end" className="w-[150px]">
        <div style={{backgroundImage: "linear-gradient(90deg, rgba(54, 15, 63, 0.5) 0%, rgba(10, 24, 49, 0.5) 97.15%)", zIndex:"10000",backgroundColor:"black",color:"white"}}>
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        </div>
        
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <div key={column.id} style={{backgroundImage: "linear-gradient(90deg, rgba(54, 15, 63, 0.5) 0%, rgba(10, 24, 49, 0.5) 97.15%)", zIndex:"10000",backgroundColor:"black",color:"white"}}>
        
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {(column.columnDef.meta as string) || column.id}
              </DropdownMenuCheckboxItem>
              </div>
            )
          })}
           
      </DropdownMenuContent>
     </div>
    </DropdownMenu>
   
  )
}
