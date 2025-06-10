"use client"

import { useState, useEffect } from "react"
import type { Mission } from "@/types/mission"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import ReactMarkdown from "react-markdown"
import { FileText, MapPin, Clock, User, DollarSign } from "lucide-react"

interface MissionDisplayFormProps {
  mission: Mission
  onUpdate: (mission: Mission) => void
}

export const MissionDisplayForm = ({ mission, onUpdate }: MissionDisplayFormProps) => {
  const [formData, setFormData] = useState<Mission>(mission)

  useEffect(() => {
    setFormData(mission)
  }, [mission])

  const handleInputChange = (field: keyof Mission, value: any) => {
    const updatedMission = { ...formData, [field]: value }
    setFormData(updatedMission)
    onUpdate(updatedMission)
  }

  const handleExpertiseRemove = (expertiseToRemove: string) => {
    const updatedExpertises = formData.requiredExpertises.filter((expertise) => expertise !== expertiseToRemove)
    handleInputChange("requiredExpertises", updatedExpertises)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          Fiche de Mission Générée
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Titre et informations générales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Titre de la mission</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="position">Poste</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <div className="mt-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="min-h-[200px] resize-none"
            />
            <div className="border rounded-md p-3 bg-gray-50 min-h-[200px] overflow-auto">
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{formData.description}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>

        {/* Localisation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="country" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Pays
            </Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="city">Ville</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="workMode">Mode de travail</Label>
            <Select
              value={formData.workMode}
              onValueChange={(value: "REMOTE" | "ONSITE" | "HYBRID") => handleInputChange("workMode", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="REMOTE">Télétravail</SelectItem>
                <SelectItem value="ONSITE">Sur site</SelectItem>
                <SelectItem value="HYBRID">Hybride</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Durée et dates */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="duration" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Durée
            </Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration || ""}
              onChange={(e) => handleInputChange("duration", e.target.value ? Number(e.target.value) : null)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="durationType">Type de durée</Label>
            <Select
              value={formData.durationType}
              onValueChange={(value: "MONTH" | "YEAR") => handleInputChange("durationType", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MONTH">Mois</SelectItem>
                <SelectItem value="YEAR">Année</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2 pt-6">
            <Checkbox
              id="startImmediately"
              checked={formData.startImmediately}
              onCheckedChange={(checked) => handleInputChange("startImmediately", checked)}
            />
            <Label htmlFor="startImmediately">Début immédiat</Label>
          </div>
          <div>
            <Label htmlFor="startDate">Date de début</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate || ""}
              onChange={(e) => handleInputChange("startDate", e.target.value || null)}
              disabled={formData.startImmediately}
              className="mt-1"
            />
          </div>
        </div>

        {/* Expérience et contrat */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="experienceYear" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              Expérience requise
            </Label>
            <Select
              value={formData.experienceYear}
              onValueChange={(value: "0-3" | "3-7" | "7-12" | "12+") => handleInputChange("experienceYear", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-3">0-3 ans</SelectItem>
                <SelectItem value="3-7">3-7 ans</SelectItem>
                <SelectItem value="7-12">7-12 ans</SelectItem>
                <SelectItem value="12+">12+ ans</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="contractType">Type de contrat</Label>
            <Select
              value={formData.contractType}
              onValueChange={(value: "FORFAIT" | "REGIE") => handleInputChange("contractType", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FORFAIT">Forfait</SelectItem>
                <SelectItem value="REGIE">Régie</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="estimatedDailyRate" className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              TJM estimé (€)
            </Label>
            <Input
              id="estimatedDailyRate"
              type="number"
              value={formData.estimatedDailyRate || ""}
              onChange={(e) => handleInputChange("estimatedDailyRate", e.target.value ? Number(e.target.value) : null)}
              className="mt-1"
            />
          </div>
        </div>

        {/* Domaine */}
        <div>
          <Label htmlFor="domain">Domaine</Label>
          <Input
            id="domain"
            value={formData.domain}
            onChange={(e) => handleInputChange("domain", e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Expertises requises */}
        <div>
          <Label>Expertises requises</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.requiredExpertises.map((expertise, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-red-100 hover:text-red-800"
                onClick={() => handleExpertiseRemove(expertise)}
              >
                {expertise} ×
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
