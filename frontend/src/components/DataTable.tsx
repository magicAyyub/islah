'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash, Users } from 'lucide-react'

interface DataTableProps<T> {
  columns: { key: string; label: string }[]
  data: T[]
  onAdd?: () => void
  onEdit: (item: T) => void
  onDelete: (item: T) => void
  onAddStudent?: (item: T) => void
}

export default function DataTable<T>({ columns, data, onAdd, onEdit, onDelete, onAddStudent }: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = data.filter((item: T) =>
    Object.values(item as Record<string, unknown>).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Search className="w-5 h-5 ml-2 text-gray-500" />
        </div>
        {onAdd && (
          <Button onClick={onAdd}>
            <Plus className="w-5 h-5 mr-2" /> Add New
          </Button>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item: T, index) => (
            // for degree, classroom, mentor display the name instead of the id 
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key}>{item[column.key as keyof typeof item] as string | number | boolean}</TableCell>
              ))}
              <TableCell>
                {onAddStudent && (
                  <Button variant="ghost" size="sm" onClick={() => onAddStudent(item)}>
                    <Users className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(item)}>
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
