import { createContext } from "react"
import React from "react"
import { useAdmSidebar } from "../hooks/useAdmSidebar"
import { useSidebar } from "../hooks/useSidebar"

interface SidebarContextValue {}

interface SidebarProviderProps {
    children: React.ReactNode
}

const SidebarContext = createContext<SidebarContextValue>({} as SidebarContextValue)

export default SidebarContext

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
    const admSidebar = useAdmSidebar()
    const sidebar = useSidebar()

    return <SidebarContext.Provider value={{ admSidebar, sidebar }}>{children}</SidebarContext.Provider>
}
