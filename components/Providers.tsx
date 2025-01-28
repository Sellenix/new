"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { SocketProvider } from "@/lib/socketContext"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <SocketProvider>
          {children}
          <Toaster />
        </SocketProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

