import { Typography } from '@mui/material'

export default function Page() {
  /**
    Soal 6: Form Input Review Kinerja
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
  return (
    <>
      <Typography variant='h2' className='mbe-3'>
        Soal 1: Komponen Slip Gaji
      </Typography>
    </>
  )
}
