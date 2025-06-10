"use client"

import { useState } from "react"
import type { Mission } from "@/types/mission"
import { missionService } from "@/services/mission-service"

export const useMissionGenerator = () => {
  const [mission, setMission] = useState<Mission | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateMission = async (description: string) => {
    if (!description.trim()) {
      setError("Veuillez saisir une description")
      return
    }

    setIsLoading(true)
    setError(null)
    setMission(null)

    try {
      const generatedMission = await missionService.generateMission({ description })
      setMission(generatedMission)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const updateMission = (updatedMission: Mission) => {
    setMission(updatedMission)
  }

  const clearMission = () => {
    setMission(null)
    setError(null)
  }

  return {
    mission,
    isLoading,
    error,
    generateMission,
    updateMission,
    clearMission,
  }
}
