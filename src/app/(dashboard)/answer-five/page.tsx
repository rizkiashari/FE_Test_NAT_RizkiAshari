import { Typography } from '@mui/material'

export default function Page() {
  /**
   Soal 5: Dashboard Review Kinerja
  Gunakan komponen Card dan Chart dari desain sistem untuk membuat dashboard sederhana. Data diperoleh dari API berikut:
  json
  Salin kode
  GET /api/performance-reviews/{employeeId}
  {
    "employeeName": "Jane Doe",
    "reviewPeriod": "Q3 2024",
    "scores": {
      "teamwork": 4.5,
      "communication": 4.0,
      "problemSolving": 4.7,
      "technicalSkills": 4.8
    },
    "feedback": "Jane menunjukkan kemajuan luar biasa dalam problem solving dan technical skills."
  }

  Tugas:
  1.  Tampilkan nama karyawan, periode review, dan rata-rata skor.
  2.  Visualisasikan skor tiap kategori menggunakan grafik Bar Chart.
  3.  Tampilkan feedback dalam Modal saat tombol "Lihat Feedback" diklik.
   */
  return (
    <>
      <Typography variant='h2' className='mbe-3'>
        Soal 1: Komponen Slip Gaji
      </Typography>
    </>
  )
}
