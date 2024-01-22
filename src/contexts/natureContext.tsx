import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface NatureContextValue {
    list: Natureza[]
    setList: (value: Natureza[]) => void
    updateNature: (nature: Natureza) => void
}

interface NatureProviderProps {
    children: React.ReactNode
}

const NatureContext = createContext<NatureContextValue>({} as NatureContextValue)

export default NatureContext

export const NatureProvider: React.FC<NatureProviderProps> = ({ children }) => {
    const [list, setList] = useState<Natureza[]>([])
    const io = useIo()

    const updateNature = (nature: Natureza) => {
        setList((list) => [...list.filter((item) => item.id != nature.id), nature])
    }

    useEffect(() => {
        console.log({ natures: list })

        io.on("nature:update", (nature) => {
            updateNature(nature)
        })

        return () => {
            io.off("nature:update")
        }
    }, [list])

    useEffect(() => {
        io.emit("nature:list")

        io.on("nature:list", (data) => {
            setList(data)
        })

        return () => {
            io.off("nature:list")
        }
    }, [])

    return <NatureContext.Provider value={{ list, setList, updateNature }}>{children}</NatureContext.Provider>
}
