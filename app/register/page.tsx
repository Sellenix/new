"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await axios.post("/api/auth/register", { name, email, password })
      toast({
        title: "Succes",
        description: "Registratie succesvol. U kunt nu inloggen.",
      })
      router.push("/login")
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Fout",
        description: "Registratie mislukt. Probeer het opnieuw.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyberpunk-dark bg-opacity-80">
      <div className="bg-cyberpunk-dark p-8 rounded-lg shadow-lg w-96 border border-cyberpunk-neon">
        <h2 className="text-2xl font-bold mb-4 text-cyberpunk-neon">Registreren</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-cyberpunk-blue mb-2">
              Naam
            </label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-cyberpunk-dark text-cyberpunk-blue border border-cyberpunk-neon rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-cyberpunk-blue mb-2">
              E-mail
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-cyberpunk-dark text-cyberpunk-blue border border-cyberpunk-neon rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-cyberpunk-blue mb-2">
              Wachtwoord
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-cyberpunk-dark text-cyberpunk-blue border border-cyberpunk-neon rounded"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyberpunk-purple hover:bg-cyberpunk-pink text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            {isLoading ? "Bezig met registreren..." : "Registreren"}
          </Button>
        </form>
      </div>
    </div>
  )
}

