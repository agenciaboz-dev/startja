import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface UserContextValue {
    user: Admin | Customer | null
    setUser: (user: Admin | Customer | null) => void
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const io = useIo()

    const [user, setUser] = useState<Admin | Customer | null>(null)

    useEffect(() => {
        console.log({ user })
        if (user) {
            io.on("connect", () => {
                console.log("reconnected, syncing user")
                io.emit("client:sync", user)
            })

            return () => {
                io.off("connect")
            }
        }
    }, [user])

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
