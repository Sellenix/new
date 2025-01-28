"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  return (
    <header className="bg-cyberpunk-dark bg-opacity-80 border-b border-cyberpunk-neon">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-cyberpunk-neon">
            Sellenix
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-cyberpunk-blue hover:text-cyberpunk-pink">
              Home
            </Link>
            {status === "authenticated" ? (
              <>
                <Link href="/dashboard" className="text-cyberpunk-blue hover:text-cyberpunk-pink">
                  Dashboard
                </Link>
                <Button onClick={() => signOut()} className="text-cyberpunk-blue hover:text-cyberpunk-pink">
                  Uitloggen
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => signIn()} className="text-cyberpunk-blue hover:text-cyberpunk-pink">
                  Inloggen
                </Button>
                <Link href="/register" className="text-cyberpunk-blue hover:text-cyberpunk-pink">
                  Registreren
                </Link>
              </>
            )}
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-cyberpunk-yellow" />
              ) : (
                <Moon className="h-5 w-5 text-cyberpunk-blue" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5 text-cyberpunk-neon" />
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="space-y-2">
              <li>
                <Link href="/" className="block text-cyberpunk-blue hover:text-cyberpunk-pink">
                  Home
                </Link>
              </li>
              {status === "authenticated" ? (
                <>
                  <li>
                    <Link href="/dashboard" className="block text-cyberpunk-blue hover:text-cyberpunk-pink">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Button
                      onClick={() => signOut()}
                      className="w-full text-left text-cyberpunk-blue hover:text-cyberpunk-pink"
                    >
                      Uitloggen
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Button
                      onClick={() => signIn()}
                      className="w-full text-left text-cyberpunk-blue hover:text-cyberpunk-pink"
                    >
                      Inloggen
                    </Button>
                  </li>
                  <li>
                    <Link href="/register" className="block text-cyberpunk-blue hover:text-cyberpunk-pink">
                      Registreren
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

