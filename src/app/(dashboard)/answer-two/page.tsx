'use client'

import { useState, type FormEvent } from 'react'

import { Typography, Input, Grid, Select, MenuItem, Alert } from '@mui/material'

import { LoadingButton } from '@mui/lab'

import { positions } from '@/data/payroll/employess'
import FormWithCustom from '@/views/widgets/FormWithCustom'

type InputFormType = {
  employeeName: string
  position: string
  grossSalary: number
  deductions: number
}

export default function Page() {
  const [errors, setError] = useState({
    employeeName: '',
    position: '',
    grossSalary: '',
    deductions: ''
  })

  const [isLoading, setLoading] = useState(false)

  const [data, setData] = useState<InputFormType>({
    employeeName: '',
    position: '',
    grossSalary: 0,
    deductions: 0
  })

  const [messageSuccess, setMessageSuccess] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!data.employeeName) {
      return setError({ ...errors, employeeName: 'Nama Karyawan harus diisi' })
    }

    if (!data.position) {
      return setError({ ...errors, position: 'Jabatan harus diisi' })
    }

    if (data.grossSalary <= 0) {
      return setError({ ...errors, grossSalary: 'Gaji Kotor harus lebih besar dari 0' })
    }

    if (data.deductions <= 0) {
      return setError({ ...errors, deductions: 'Potongan harus lebih besar dari 0' })
    }

    if (data.deductions > data.grossSalary * 0.5) {
      return setError({ ...errors, deductions: 'Potongan tidak boleh lebih dari 50% dari Gaji Kotor' })
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 2000)

    console.log(data)
    setMessageSuccess('Data berhasil disimpan')

    setTimeout(() => {
      setData({
        employeeName: '',
        position: '',
        grossSalary: 0,
        deductions: 0
      })
      setMessageSuccess('')
    }, 2200)
  }

  return (
    <>
      <Typography variant='h2' className='mbe-3'>
        Soal 2: Form Input Gaji
      </Typography>
      {messageSuccess && (
        <Alert severity='success' className='mbe-3'>
          {messageSuccess}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6} className='mbe-3'>
          <Grid item xs={12} md={6}>
            <FormWithCustom name='employeeName' error={errors.employeeName} label='Nama Karyawan'>
              <Input
                id='employeeName'
                name='employeeName'
                type='text'
                value={data.employeeName}
                onChange={e => setData({ ...data, employeeName: e.target.value })}
              />
            </FormWithCustom>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormWithCustom name='position' error={errors.position} label='Jabatan'>
              <Select
                id='position'
                name='position'
                value={data.position}
                onChange={e => setData({ ...data, position: e.target.value as string })}
              >
                {positions.map((position, index) => (
                  <MenuItem key={index} value={position}>
                    {position}
                  </MenuItem>
                ))}
              </Select>
            </FormWithCustom>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormWithCustom name='grossSalary' error={errors.grossSalary} label='Gaji Kotor'>
              <Input
                id='grossSalary'
                name='grossSalary'
                type='number'
                value={data.grossSalary === 0 ? '' : data.grossSalary}
                onChange={e => setData({ ...data, grossSalary: Number(e.target.value) })}
              />
            </FormWithCustom>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormWithCustom name='deductions' error={errors.deductions} label='Potongan'>
              <Input
                id='deductions'
                name='deductions'
                type='number'
                value={data.deductions === 0 ? '' : data.deductions}
                onChange={e => setData({ ...data, deductions: Number(e.target.value) })}
              />
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
