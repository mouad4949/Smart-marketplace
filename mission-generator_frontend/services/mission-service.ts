import axios from "axios"
import type { Mission, GenerateMissionRequest } from "@/types/mission"

const API_BASE_URL = "http://localhost:5011"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds timeout
})

export const missionService = {
  async generateMission(request: GenerateMissionRequest): Promise<Mission> {
    try {
      const response = await apiClient.post<Mission>("/api/missions/generate", request)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Une erreur est survenue lors de la génération de la mission")
      }
      throw new Error("Une erreur inattendue est survenue")
    }
  },
}
