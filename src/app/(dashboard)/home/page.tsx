import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'

import Link from '@/components/Link'
import { answerLink } from '@/data/navigation/answerLink'

export default function Page() {
  return (
    <>
      <Typography variant='h2' className='mb-4'>
        Card Link Answer 1 - 6
      </Typography>

      <Typography variant='h4' className='mb-4'>
        Disclaimer - This is a dummy images
      </Typography>

      <Grid container spacing={6}>
        {answerLink.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Link href={item.href}>
              <Card>
                <CardMedia image={item.image} className='bs-[140px]' />
                <CardContent className='relative'>
                  <Typography variant='h4' className='mt-1 line-clamp-1'>
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
