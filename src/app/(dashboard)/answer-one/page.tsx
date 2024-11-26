import { Grid, Typography } from '@mui/material'

import { employees } from '@/data/payroll/employess'
import CardEmploye from '@/views/widgets/CardEmploye'

export default function Page() {
  return (
    <>
      <Typography variant='h3' className='mbe-2'>
        Soal 1: Komponen Slip Gaji
      </Typography>
      <Grid container spacing={5}>
        {employees.map(employee => (
          <Grid key={employee.employeeId} item xs={12} sm={6} md={4} lg={3}>
            <CardEmploye {...employee} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
