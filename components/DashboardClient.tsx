"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { SubscriptionManager } from "@/components/SubscriptionManager"
import { WebsiteList } from "@/components/WebsiteList"
import { SEOReports } from "@/components/SEOReports"
import { PaymentHistory } from "@/components/PaymentHistory"
import { useSocket } from "@/lib/socketContext"

interface User {
  name: string
  email: string
  createdAt: string
}

interface SEOData {
  date: string
  score: number
}

export default function DashboardClient() {
  const [user, setUser] = useState<User | null>(null)
  const [seoData, setSeoData] = useState<SEOData[]>([])
  const [loading, setLoading] = useState(true)
  const { socket } = useSocket()

  useEffect(() => {
    fetchDashboardData()

    if (socket) {
      socket.on("dashboard_update", handleDashboardUpdate)
    }

    return () => {
      if (socket) {
        socket.off("dashboard_update", handleDashboardUpdate)
      }
    }
  }, [socket])

  const fetchDashboardData = async () => {
    try {
      const [userResponse, seoResponse] = await Promise.all([
        axios.get<User>("/api/user"),
        axios.get<SEOData[]>("/api/seo/overview"),
      ])
      setUser(userResponse.data)
      setSeoData(seoResponse.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het ophalen van uw gegevens. Probeer het later opnieuw.",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const handleDashboardUpdate = (data: any) => {
    if (data.seoData) {
      setSeoData(data.seoData)
    }
    // Handle other real-time updates as needed
  }

  if (loading) return <div>Laden...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-cyberpunk-neon">Dashboard</h1>

      <Card className="mb-8 bg-cyberpunk-dark bg-opacity-80 border-cyberpunk-neon">
        <CardHeader>
          <CardTitle className="text-cyberpunk-pink">Welkom terug, {user?.name}</CardTitle>
          <CardDescription className="text-cyberpunk-blue">Hier is een overzicht van uw account</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-cyberpunk-blue">E-mail: {user?.email}</p>
          <p className="text-cyberpunk-blue">
            Lid sinds: {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8 bg-cyberpunk-dark bg-opacity-80 border-cyberpunk-neon">
        <CardHeader>
          <CardTitle className="text-cyberpunk-pink">SEO Prestaties Overzicht</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={seoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#00ffff" />
              <YAxis stroke="#00ffff" />
              <Tooltip contentStyle={{ backgroundColor: "#0a0a2a", border: "1px solid #00ff00" }} />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#ff00ff" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SubscriptionManager />
        <WebsiteList />
      </div>

      <div className="mt-8">
        <SEOReports />
      </div>

      <div className="mt-8">
        <PaymentHistory />
      </div>
    </div>
  )
}

