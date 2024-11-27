'use client'

// React Imports
import type { FC } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import type { EmployesType } from '@/types/employes'

const CardEmploye: FC<EmployesType> = ({ employeeName, position, grossSalary, deductions, netSalary }) => {
  return (
    <Card>
      <CardMedia image={`https://i.pravatar.cc/150?u=${Math.floor(Math.random() * 1000)}`} className='bs-[140px]' />
      <CardContent className='relative'>
        <Typography variant='h4' className='mt-1 line-clamp-1'>
          {employeeName}
        </Typography>
        <Typography variant='body1' className='text-secondary'>
          {position}
        </Typography>
        <Typography variant='body2' className='mt-2'>
          <strong>Gaji Kotor:</strong> Rp {grossSalary.toLocaleString()}
        </Typography>
        <Typography variant='body2'>
          <strong>Potongan:</strong> Rp {deductions.toLocaleString()}
        </Typography>
        <Typography variant='body2'>
          <strong>Gaji Bersih:</strong> Rp {netSalary.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardEmploye
