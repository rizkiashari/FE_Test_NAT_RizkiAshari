type ScoresType = {
  teamwork: number
  communication: number
  problemSolving: number
  technicalSkills: number
}

export type ReviewKinerjaType = {
  employeeName: string
  reviewPeriod: string
  scores: ScoresType
  feedback: string
}
