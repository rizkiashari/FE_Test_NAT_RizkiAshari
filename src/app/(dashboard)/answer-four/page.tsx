'use client'

import { useEffect, useState, type FormEvent } from 'react'

import { Alert, Grid, Input, MenuItem, Select, Typography } from '@mui/material'

import { LoadingButton } from '@mui/lab'

import FormWithCustom from '@/views/widgets/FormWithCustom'
import { employees } from '@/data/payroll/employess'
import CustomTextField from '@/@core/components/mui/TextField'
import AppReactDatepicker from '@/lbs/styles/AppReactDatepicker'

type InputFormType = {
  employeeId: number | undefined
  destination: string
  reason: string
}

export default function Page() {
  const [dateDeparture, setDateDeparture] = useState<Date | null | undefined>(null)
  const [dateReturn, setDateReturn] = useState<Date | null | undefined>(null)

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
    reason: ''
  })

  const [messageSuccess, setMessageSuccess] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!data.employeeId) {
      return setError({ ...errors, employeeId: 'Nama Karyawan harus diisi' })
    }

    if (!data.destination) {
      return setError({ ...errors, destination: 'Tujuan harus diisi' })
    }

    if (!dateDeparture) {
      return setError({ ...errors, departureDate: 'Tanggal Keberangkatan harus diisi' })
    }

    if (!dateReturn) {
      return setError({ ...errors, returnDate: 'Tanggal Kepulangan harus diisi' })
    }

    if (dateDeparture && dateDeparture < new Date()) {
      return setError({ ...errors, departureDate: 'Tanggal Keberangkatan tidak boleh sebelum hari ini' })
    }

    if (dateDeparture && dateReturn && dateDeparture > dateReturn) {
      return setError({ ...errors, returnDate: 'Tanggal Kepulangan harus setelah Tanggal Keberangkatan' })
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 2000)

    const dataNew = {
      employeeId: data.employeeId,
      destination: data.destination,
      departureDate: dateDeparture?.toISOString(),
      returnDate: dateReturn?.toISOString(),
      reason: data.reason
    }

    console.log(dataNew)

    setMessageSuccess('Data berhasil disimpan')

    setTimeout(() => {
      setData({
        employeeId: undefined,
        destination: '',
        reason: ''
      })
      setDateDeparture(null)
      setDateReturn(null)
      setMessageSuccess('')
    }, 2200)
  }

  useEffect(() => {
    // Reset error message when data is changed
    setTimeout(() => {
      setError({
        employeeId: '',
        destination: '',
        departureDate: '',
        returnDate: ''
      })
    }, 1000)
  }, [data, dateDeparture, dateReturn])

  return (
    <>
      <Typography variant='h2' className='mbe-3'>
        Soal 4: Form Permintaan Perjalanan Dinas
      </Typography>
      {messageSuccess && (
        <Alert severity='success' className='mbe-3'>
          {messageSuccess}
        </Alert>
      )}
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
            <AppReactDatepicker
              selected={dateDeparture}
              placeholderText='YYYY-MM-DD'
              dateFormat={'yyyy-MM-dd'}
              onChange={(date: Date | null) => setDateDeparture(date)}
              customInput={
                <CustomTextField
                  fullWidth
                  label='Tanggal Keberangkatan'
                  FormHelperTextProps={{ error: true }}
                  helperText={errors.departureDate}
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <AppReactDatepicker
              selected={dateReturn}
              placeholderText='YYYY-MM-DD'
              dateFormat={'yyyy-MM-dd'}
              onChange={(date: Date | null) => setDateReturn(date)}
              customInput={
                <CustomTextField
                  label='Tanggal Kepulangan'
                  fullWidth
                  FormHelperTextProps={{ error: true }}
                  helperText={errors.returnDate}
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField
              rows={4}
              multiline
              name='reason'
              fullWidth
              label='Alasan Perjalanan'
              id='reason'
              value={data.reason}
              onChange={e => setData({ ...data, reason: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6} />
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
