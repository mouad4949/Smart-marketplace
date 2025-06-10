"use client"

import { MissionInputForm } from "@/components/mission/mission-input-form"
import { MissionDisplayForm } from "@/components/mission/mission-display-form"
import { ErrorToast } from "@/components/common/error-toast"
import { useMissionGenerator } from "@/hooks/use-mission-generator"
import { Toaster } from "react-hot-toast"

export default function Home() {
  const { mission, isLoading, error, generateMission, updateMission, clearMission } = useMissionGenerator()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto">
        <MissionInputForm onGenerate={generateMission} isLoading={isLoading} />

        {mission && <MissionDisplayForm mission={mission} onUpdate={updateMission} />}

        <ErrorToast error={error} onClear={() => {}} />

        <Toaster />
      </div>
    </div>
  )
}
