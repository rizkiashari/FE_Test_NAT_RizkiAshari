'use client'

import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'

import type { SliderValueLabelProps } from '@mui/material'
import { Alert, FormHelperText, Grid, Input, MenuItem, Select, Slider, Tooltip, Typography } from '@mui/material'

import { LoadingButton } from '@mui/lab'

import FormWithCustom from '@/views/widgets/FormWithCustom'
import { employees } from '@/data/payroll/employess'
import CustomTextField from '@/@core/components/mui/TextField'

type InputDataType = {
  employeeId: number | undefined
  reviewPeriod: string
  scores: {
    teamwork: number
    communication: number
    problemSolving: number
    technicalSkills: number
  }
  feedback: string
}

function ValueLabelComponent(props: SliderValueLabelProps) {
  const { children, value } = props

  return (
    <Tooltip enterTouchDelay={0} placement='top' title={value}>
      {children}
    </Tooltip>
  )
}

export default function Page() {
  /**
    Gunakan komponen Form untuk membuat form input review kinerja dengan field:
    - Nama Karyawan (dropdown dari API /api/employees)
    - Periode Review (input teks)
    - Skor (slider atau input angka untuk tiap kategori: teamwork, communication, problem solving, technical skills)
    - Feedback (textarea, opsional)
    Validasi:
    1.  Semua skor wajib diisi dengan angka antara 1-5.
    2.  Nama Karyawan dan Periode Review tidak boleh kosong.
    3.  Kirim data ke API berikut:
    json
    Salin kode
    POST /api/performance-reviews
    {
      "employeeId": 123,
      "reviewPeriod": "Q3 2024",
      "scores": {
        "teamwork": 4.5,
        "communication": 4.0,
        "problemSolving": 4.7,
        "technicalSkills": 4.8
      },
      "feedback": "Kinerja baik secara keseluruhan."
    }
   */

  const [messageSuccess, setMessageSuccess] = useState<string>('')
  const [isLoading, setLoading] = useState(false)

  const [data, setData] = useState<InputDataType>({
    employeeId: 0,
    reviewPeriod: '',
    scores: {
      teamwork: 0,
      communication: 0,
      problemSolving: 0,
      technicalSkills: 0
    },
    feedback: ''
  })

  const [errors, setError] = useState({
    employeeId: '',
    reviewPeriod: '',
    teamwork: '',
    communication: '',
    problemSolving: '',
    technicalSkills: ''
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!data.employeeId || +data.employeeId === 0) {
      return setError({ ...errors, employeeId: 'Nama Karyawan harus diisi' })
    }

    if (!data.reviewPeriod) {
      return setError({ ...errors, reviewPeriod: 'Periode Review harus diisi' })
    }

    if (data.scores.teamwork === 0) {
      return setError({ ...errors, teamwork: 'Skor TeamWork harus diisi' })
    }

    if (data.scores.communication === 0) {
      return setError({ ...errors, communication: 'Skor Communication harus diisi' })
    }

    if (data.scores.problemSolving === 0) {
      return setError({ ...errors, problemSolving: 'Skor Problem Solving harus diisi' })
    }

    if (data.scores.technicalSkills === 0) {
      return setError({ ...errors, technicalSkills: 'Skor Technical Skills harus diisi' })
    }

    // TODO: Kirim data ke API
    console.log(data)

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 2000)

    setMessageSuccess('Data berhasil disimpan')

    setTimeout(() => {
      setMessageSuccess('')

      setData({
        employeeId: 0,
        reviewPeriod: '',
        scores: {
          teamwork: 0,
          communication: 0,
          problemSolving: 0,
          technicalSkills: 0
        },
        feedback: ''
      })
    }, 2200)
  }

  useEffect(() => {
    setError({
      employeeId: '',
      reviewPeriod: '',
      teamwork: '',
      communication: '',
      problemSolving: '',
      technicalSkills: ''
    })
  }, [data])

  return (
    <>
      <Typography variant='h2' className='mbe-3'>
        Soal 6: Form Input Review Kinerja
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
                <MenuItem value='0'>Pilih Karyawan</MenuItem>
                {employees.map((employee, index) => (
                  <MenuItem key={index} value={employee.employeeId}>
                    {employee.employeeName}
                  </MenuItem>
                ))}
              </Select>
            </FormWithCustom>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormWithCustom name='reviewPeriod' error={errors.reviewPeriod} label='Periode Review'>
              <Input
                id='reviewPeriod'
                name='reviewPeriod'
                type='text'
                value={data.reviewPeriod}
                onChange={e => setData({ ...data, reviewPeriod: e.target.value })}
              />
            </FormWithCustom>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>TeamWork</Typography>
            <Slider
              valueLabelDisplay='auto'
              slots={{
                valueLabel: ValueLabelComponent
              }}
              aria-label='custom thumb label'
              value={data.scores.teamwork}
              onChange={(e, value) => setData({ ...data, scores: { ...data.scores, teamwork: +value } })}
              min={0}
              max={5}
            />
            <FormHelperText error>{errors.teamwork}</FormHelperText>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Communication</Typography>
            <Slider
              valueLabelDisplay='auto'
              slots={{
                valueLabel: ValueLabelComponent
              }}
              aria-label='custom thumb label'
              value={data.scores.communication}
              onChange={(e, value) => setData({ ...data, scores: { ...data.scores, communication: +value } })}
              min={0}
              max={5}
            />
            <FormHelperText error>{errors.communication}</FormHelperText>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Problem Solving</Typography>
            <Slider
              valueLabelDisplay='auto'
              slots={{
                valueLabel: ValueLabelComponent
              }}
              aria-label='custom thumb label'
              value={data.scores.problemSolving}
              onChange={(e, value) => setData({ ...data, scores: { ...data.scores, problemSolving: +value } })}
              min={0}
              max={5}
            />
            <FormHelperText error>{errors.problemSolving}</FormHelperText>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Technical Skills</Typography>
            <Slider
              valueLabelDisplay='auto'
              slots={{
                valueLabel: ValueLabelComponent
              }}
              aria-label='custom thumb label'
              value={data.scores.technicalSkills}
              onChange={(e, value) => setData({ ...data, scores: { ...data.scores, technicalSkills: +value } })}
              min={0}
              max={5}
            />
            <FormHelperText error>{errors.technicalSkills}</FormHelperText>
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField
              rows={4}
              multiline
              name='feedback'
              fullWidth
              label='Feedback'
              id='feedback'
              value={data.feedback}
              onChange={e => setData({ ...data, feedback: e.target.value })}
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
