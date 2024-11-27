'use client'

// React Imports
import { useState, type FC } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { Box, Button, Modal } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'

import type { ReviewKinerjaType } from '@/types/reviewKinerja'
import ApexBarChart from '../charts/ApexBarChart'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 8,
  borderRadius: 2
}

const CardKinerja: FC<ReviewKinerjaType> = ({ employeeName, feedback, scores, reviewPeriod }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <Card>
      <CardMedia
        image={`https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`}
        className='bs-[140px]'
      />
      <CardContent className='relative'>
        <Typography variant='h4' className='mt-1 line-clamp-1'>
          {employeeName}
        </Typography>
        <Typography variant='body1' className='text-secondary'>
          {reviewPeriod}
        </Typography>
        <Typography variant='body2' className='mt-2'>
          <strong>Rata-rata Skor:</strong> {(Object.values(scores).reduce((acc, curr) => acc + curr, 0) / 4).toFixed(2)}
        </Typography>
        <Button variant='contained' color='primary' onClick={() => setShowModal(true)} className='mt-2'>
          Lihat Feedback
        </Button>
        {showModal && (
          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            open={showModal}
            onClose={() => setShowModal(false)}
            keepMounted
          >
            <Box sx={style}>
              <Typography variant='h5' className='mbe-5'>
                Feedback {employeeName}
              </Typography>
              <Typography variant='body1'>{feedback}</Typography>
              {/* Visualisasi Chart Bar */}
              <ApexBarChart
                categories={Object.keys(scores)}
                data={Object.values(scores)}
                title={`Skor Kinerja ${employeeName}`}
                subTitle={`Periode Review: ${reviewPeriod}`}
              />
            </Box>
          </Modal>
        )}
      </CardContent>
    </Card>
  )
}

export default CardKinerja
