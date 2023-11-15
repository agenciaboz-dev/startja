import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface NatureContextValue {
    list: Nature[]
    setList: (value: Nature[]) => void
}

interface NatureProviderProps {
    children: React.ReactNode
}

const NatureContext = createContext<NatureContextValue>({} as NatureContextValue)

export default NatureContext

export const NatureProvider: React.FC<NatureProviderProps> = ({ children }) => {
    const [list, setList] = useState<Nature[]>([])
    const io = useIo()

    useEffect(() => {
        console.log({ natures: list })
    }, [list])

    useEffect(() => {
        io.on("nature:list", (data) => {
            setList(data)
        })

        return () => {
            io.off("nature:list")
        }
    }, [])

    return <NatureContext.Provider value={{ list, setList }}>{children}</NatureContext.Provider>
}
