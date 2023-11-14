import { createContext, useState } from "react"
import React from "react"

interface HeaderContextValue {
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
}

interface HeaderProviderProps {
    children: React.ReactNode
}

const HeaderContext = createContext<HeaderContextValue>({} as HeaderContextValue)

export default HeaderContext

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
    const [title, setTitle] = useState("")

    return <HeaderContext.Provider value={{ title, setTitle }}>{children}</HeaderContext.Provider>
}
