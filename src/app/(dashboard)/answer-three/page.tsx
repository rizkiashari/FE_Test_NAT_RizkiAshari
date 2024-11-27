'use client'

import { useState } from 'react'

import { Card, CardContent, MenuItem, Select, Typography } from '@mui/material'

import { employees } from '@/data/payroll/employess'
import FormWithCustom from '@/views/widgets/FormWithCustom'

// import DebouncedInput from '@/views/widgets/DebouncedInput'

export default function Page() {
  const [globalFilter, setGlobalFilter] = useState<string>('')

  /**
Gunakan komponen Table dari desain sistem untuk menampilkan riwayat perjalanan dinas. Data diambil dari API berikut:
json
Salin kode
GET /api/travel-requests
[
  {
    "id": 1,
    "employeeName": "Jane Doe",
    "destination": "Surabaya",
    "departureDate": "2024-11-01",
    "returnDate": "2024-11-05",
    "reason": "Meeting klien"
  },
  {
    "id": 2,
    "employeeName": "John Smith",
    "destination": "Jakarta",
    "departureDate": "2024-11-10",
    "returnDate": "2024-11-12",
    "reason": "Konferensi tahunan"
  }
]

Tugas:
Tampilkan kolom berikut: Nama Karyawan, Tujuan, Tanggal Keberangkatan, Tanggal Kepulangan, Alasan.
Tambahkan fitur filter berdasarkan Nama Karyawan menggunakan Dropdown dari desain sistem.
Tampilkan detail perjalanan dinas di dalam Modal saat salah satu baris diklik.
   */
  return (
    <>
      <Typography variant='h2' className='mbe-3'>
        Soal 3: Daftar Perjalanan Dinas
      </Typography>

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
              >
                {employees.map((employe, index) => (
                  <MenuItem key={index} value={employe.employeeName}>
                    {employe.employeeName}
                  </MenuItem>
                ))}
              </Select>
            </FormWithCustom>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
