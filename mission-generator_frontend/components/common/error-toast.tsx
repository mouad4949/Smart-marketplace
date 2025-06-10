"use client"

import { useEffect } from "react"
import { toast } from "react-hot-toast"

interface ErrorToastProps {
  error: string | null
  onClear: () => void
}

export const ErrorToast = ({ error, onClear }: ErrorToastProps) => {
  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 5000,
        position: "top-right",
      })
      onClear()
    }
  }, [error, onClear])

  return null
}
