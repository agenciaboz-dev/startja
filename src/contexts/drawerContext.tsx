import { createContext, useState } from "react"
import React from "react"

interface DrawerContextValue {
    setOpenDrawer: any
    openDrawer: any
}

interface DrawerProviderProps {
    children: React.ReactNode
}

const DrawerContext = createContext<DrawerContextValue>({} as DrawerContextValue)

export default DrawerContext

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
    const [openDrawer, setOpenDrawer] = useState(false)

    return <DrawerContext.Provider value={{ openDrawer, setOpenDrawer }}>{children}</DrawerContext.Provider>
}
