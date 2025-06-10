"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Loader2 } from "lucide-react"

interface MissionInputFormProps {
  onGenerate: (description: string) => void
  isLoading: boolean
}

export const MissionInputForm = ({ onGenerate, isLoading }: MissionInputFormProps) => {
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(description)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <Wand2 className="h-6 w-6 text-blue-600" />
          Générateur de Fiches de Mission
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre besoin ici... (ex: Je cherche un développeur Java senior pour 6 mois à Paris)"
              className="min-h-[120px] resize-none"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading || !description.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Générer la mission
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
