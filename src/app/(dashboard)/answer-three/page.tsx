import { Card, CardContent, Typography } from '@mui/material'

import DinasTable from '@/views/widgets/DinasTable'
import { travels } from '@/data/dinas/perjalanan'

export default function Page() {
  return (
    <>
      <Typography variant='h2' className='mbe-3'>
        Soal 3: Daftar Perjalanan Dinas
      </Typography>

      <Card>
        <CardContent>
          <DinasTable tableData={travels} />
        </CardContent>
      </Card>
    </>
  )
}
