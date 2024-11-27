import { Grid, Typography } from '@mui/material'

import { reviewKinerja } from '@/data/review/reviewkinerja'
import CardKinerja from '@/views/widgets/CardKinerja'

export default function Page() {
  return (
    <>
      <Typography variant='h2' className='mbe-3'>
        Soal 5: Dashboard Review Kinerja
      </Typography>
      <Grid container spacing={3}>
        {reviewKinerja.map((review, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <CardKinerja {...review} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
