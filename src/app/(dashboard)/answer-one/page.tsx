import { Grid, Typography } from '@mui/material'

import { employees } from '@/data/payroll/employess'
import CardEmploye from '@/views/widgets/CardEmploye'

export default function Page() {
  return (
    <>
      <Typography variant='h2' className='mbe-3'>
        Soal 1: Komponen Slip Gaji
      </Typography>
      <Grid container spacing={6}>
        {employees.map((employee, idx) => (
          <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
            <CardEmploye {...employee} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
