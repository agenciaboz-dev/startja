import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface CustomersListContextValue {
    list: Customer[]
    setList: (value: Customer[]) => void
}

interface CustomersListProviderProps {
    children: React.ReactNode
}

const CustomersListContext = createContext<CustomersListContextValue>({} as CustomersListContextValue)

export default CustomersListContext

export const CustomersListProvider: React.FC<CustomersListProviderProps> = ({ children }) => {
    const [list, setList] = useState<Customer[]>([])
    const io = useIo()

    useEffect(() => {
        console.log({ list })
    }, [list])

    useEffect(() => {
        io.on("customer:list", (data) => {
            setList(data)
        })

        return () => {
            io.off("customer:list")
        }
    }, [])

    return <CustomersListContext.Provider value={{ list, setList }}>{children}</CustomersListContext.Provider>
}
