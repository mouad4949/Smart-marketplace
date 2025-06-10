export interface Mission {
  title: string
  description: string
  country: string
  city: string
  workMode: "REMOTE" | "ONSITE" | "HYBRID"
  duration: number | null
  durationType: "MONTH" | "YEAR"
  startImmediately: boolean
  startDate: string | null
  experienceYear: "0-3" | "3-7" | "7-12" | "12+"
  contractType: "FORFAIT" | "REGIE"
  estimatedDailyRate: number | null
  domain: string
  position: string
  requiredExpertises: string[]
}

export interface GenerateMissionRequest {
  description: string
}
