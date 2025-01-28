import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { SocketProvider } from "@/lib/socketContext"
import { SessionProvider } from "next-auth/react"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sellenix",
  description: "Jouw all-in-one oplossing voor webshops, websites en SEO",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen bg-cyberpunk-dark`}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <SocketProvider>
              <div className="relative">
                <div className="fixed inset-0 z-[-1]">
                  <img src="https://netslim.nl/bg.PNG" alt="Background" className="w-full h-full object-cover" />
                </div>
                <Header />
                <main className="flex-grow relative z-10">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </SocketProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}



import './globals.css'