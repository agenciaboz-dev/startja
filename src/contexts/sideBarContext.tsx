import { createContext } from "react"
import React from "react"
import { useAdmSidebar } from "../hooks/useAdmSidebar"

interface SidebarContextValue {}

interface SidebarProviderProps {
    children: React.ReactNode
}

const SidebarContext = createContext<SidebarContextValue>({} as SidebarContextValue)

export default SidebarContext

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
    const admSidebar = useAdmSidebar()

    return <SidebarContext.Provider value={{ admSidebar }}>{children}</SidebarContext.Provider>
}
