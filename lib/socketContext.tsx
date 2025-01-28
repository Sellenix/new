"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Socket } from "socket.io-client"

interface SocketContextType {
  socket: Socket | null
}

const SocketContext = createContext<SocketContextType>({ socket: null })

export const useSocket = () => useContext(SocketContext)

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const initSocket = async () => {
      const io = (await import("socket.io-client")).default
      const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "https://netslim.nl")
      setSocket(newSocket)
    }

    initSocket()

    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [setSocket]) // Added setSocket to dependencies

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}

