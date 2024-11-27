'use client'

// React Imports
import { useState, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'

// Third-party Imports
import classnames from 'classnames'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

import { Backdrop, Box, CardContent, MenuItem, Modal, Select } from '@mui/material'

import moment from 'moment'

import TablePaginationComponent from '@components/TablePaginationComponent'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import FormWithCustom from './FormWithCustom'
import { employees } from '@/data/payroll/employess'

const columnHelper = createColumnHelper<any>()

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  height: '75%',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 8,
  borderRadius: 2
}

type SelectRowType = {
  employeeName: string
  destination: string
  departureDate: string
  returnDate: string
  reason: string
}

const DinasTable = ({ tableData }: { tableData: any[] }) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [data] = useState(...[tableData])
  const [filteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  const [showDetail, setShowDetail] = useState(false)
  const [selectRow, setSelectRow] = useState<SelectRowType | undefined>()

  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      columnHelper.accessor('employeeName', {
        header: 'Nama Karyawan',
        enableSorting: false,
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.employeeName}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('destination', {
        header: 'Tujuan',
        enableSorting: false,
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize' color='text.primary'>
              {row.original.destination}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('departureDate', {
        header: 'Tanggal Keberangkatan',
        enableSorting: false,
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {moment(row.original.departureDate).format('DD MMMM YYYY')}
          </Typography>
        )
      }),
      columnHelper.accessor('returnDate', {
        header: 'Tanggal Kepulangan',
        enableSorting: false,
        cell: ({ row }) => <Typography>{moment(row.original.returnDate).format('DD MMMM YYYY')}</Typography>
      }),
      columnHelper.accessor('reason', {
        enableSorting: false,
        header: 'Alasan',
        cell: ({ row }) => <Typography>{row.original.reason}</Typography>
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton
              onClick={() => {
                setShowDetail(true)
                setSelectRow(row.original)
              }}
            >
              <i className='text-primary tabler tabler-eye' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, filteredData]
  )

  const table = useReactTable({
    data: filteredData as any[],
    columns,
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel()
  })

  return (
    <>
      <Card>
        <CardContent className='flex justify-end'>
          <div className='w-[20rem]'>
            <FormWithCustom name='employeName' label='Nama Karyawan'>
              <Select
                id='employeName'
                name='employeName'
                onChange={e => {
                  setGlobalFilter(String(e.target.value))
                }}
                value={globalFilter}
              >
                <MenuItem value=''>All</MenuItem>
                {employees.map((employe, index) => (
                  <MenuItem key={index} value={employe.employeeName}>
                    {employe.employeeName}
                  </MenuItem>
                ))}
              </Select>
            </FormWithCustom>
          </div>
        </CardContent>

        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>

        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>

      {showDetail && (
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          open={showDetail}
          onClose={() => {
            setShowDetail(false)
            setSelectRow(undefined)
          }}
          keepMounted
        >
          <Box sx={style} className='md:w-[60%] lg:w-[50%] sm:w-[90%] w-[90%]'>
            <Typography variant='h5' className='mbe-5'>
              Detail Dinas {selectRow?.employeeName}
            </Typography>
            <Typography variant='body1'>
              <strong>Tujuan:</strong> {selectRow?.destination}
            </Typography>
            <Typography variant='body1'>
              <strong>Tanggal Keberangkatan:</strong> {moment(selectRow?.departureDate).format('DD MMMM YYYY')}
            </Typography>
            <Typography variant='body1'>
              <strong>Tanggal Kepulangan:</strong> {moment(selectRow?.returnDate).format('DD MMMM YYYY')}
            </Typography>
            <Typography variant='body1'>
              <strong>Alasan:</strong> {selectRow?.reason}
            </Typography>
          </Box>
        </Modal>
      )}
    </>
  )
}

export default DinasTable
