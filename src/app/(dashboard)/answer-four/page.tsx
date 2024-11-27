'use client'

import { useState, type FormEvent } from 'react'

import { FormControl, Grid, Input, MenuItem, Select, TextareaAutosize, TextField, Typography } from '@mui/material'

import { DatePicker , LoadingButton } from '@mui/lab'



import FormWithCustom from '@/views/widgets/FormWithCustom'
import { employees } from '@/data/payroll/employess'

type InputFormType = {
  employeeId: number | undefined
  destination: string
  departureDate: string
  returnDate: string
  reason: string
}

export default function Page() {
  /**
Gunakan komponen Form untuk membuat form permintaan perjalanan dinas. Field:
  - Nama Karyawan (dropdown dari API /api/employees)
  - Tujuan (input teks)
  - Tanggal Keberangkatan dan Kepulangan (date picker)
  - Alasan Perjalanan (textarea)
Validasi:
  1. Nama Karyawan dan Tujuan wajib diisi.
  2. Tanggal Keberangkatan tidak boleh sebelum hari ini.
  3. Tanggal Kepulangan harus setelah Tanggal Keberangkatan.
Data yang valid dikirim ke API berikut:
    json
    Salin kode
    POST /api/travel-requests
    {
      "employeeId": 123,
      "destination": "Jakarta",
      "departureDate": "2024-11-25",
      "returnDate": "2024-11-28",
      "reason": "Konferensi HR"
    }
   */
  const [errors, setError] = useState({
    employeeId: '',
    destination: '',
    departureDate: '',
    returnDate: ''
  })

  const [isLoading, setLoading] = useState(false)

  const [data, setData] = useState<InputFormType>({
    employeeId: undefined,
    destination: '',
    departureDate: '',
    returnDate: '',
    reason: ''
  })

  const [messageSuccess, setMessageSuccess] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <Typography variant='h2' className='mbe-3'>
        Soal 4: Form Permintaan Perjalanan Dinas
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6} className='mbe-3'>
          <Grid item xs={12} md={6}>
            <FormWithCustom name='employeeId' error={errors.employeeId} label='Nama Karyawan'>
              <Select
                id='employeeId'
                name='employeeId'
                value={data.employeeId}
                onChange={e => setData({ ...data, employeeId: e.target.value as number })}
              >
                {employees.map((employee, index) => (
                  <MenuItem key={index} value={employee.employeeId}>
                    {employee.employeeName}
                  </MenuItem>
                ))}
              </Select>
            </FormWithCustom>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormWithCustom name='destination' error={errors.destination} label='Tujuan'>
              <Input
                id='destination'
                name='destination'
                type='text'
                value={data.destination}
                onChange={e => setData({ ...data, destination: e.target.value })}
              />
            </FormWithCustom>
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              value={data.departureDate}
              onChange={(date: any) => setData({ ...data, departureDate: date })}
              renderInput={() => (
                <TextField label='Tanggal Keberangkatan' name='departureDate' helperText={errors.departureDate} />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              value={data.returnDate}
              onChange={(date: any) => setData({ ...data, returnDate: date })}
              renderInput={() => (
                <TextField label='Tanggal Kepulangan' name='returnDate' helperText={errors.returnDate} />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormWithCustom name='reason' label='Alasan Perjalanan'>
              <TextareaAutosize name='reason' id='reason' />
            </FormWithCustom>
          </Grid>
          <Grid item xs={12} md={6}>
            <LoadingButton
              type='submit'
              disabled={isLoading}
              fullWidth
              loading={isLoading}
              variant='contained'
              color='primary'
              loadingIndicator='Loading...'
            >
              Simpan
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
