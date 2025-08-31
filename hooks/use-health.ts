"use client"

import { useQuery } from "@tanstack/react-query"

interface HealthResponse {
  status: "ok" | "error"
}

async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch("http://localhost:3000/health")
  if (!response.ok) {
    throw new Error("Health check failed")
  }
  return response.json()
}

export function useHealth() {
  return useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
    refetchInterval: 30000, // Check every 30 seconds
    retry: 3,
  })
}
