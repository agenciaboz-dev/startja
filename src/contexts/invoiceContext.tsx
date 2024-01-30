import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface InvoiceContextValue {
    list: notaFiscal[]
    setList: (value: notaFiscal[]) => void
}

interface InvoiceProviderProps {
    children: React.ReactNode
}

const InvoiceContext = createContext<InvoiceContextValue>({} as InvoiceContextValue)

export default InvoiceContext

export const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children }) => {
    const [list, setList] = useState<notaFiscal[]>([])
    const io = useIo()

    useEffect(() => {
        console.log({ invoices: list })
    }, [list])

    useEffect(() => {
        io.emit("nota:list")
        io.on("nota:list", (data) => {
            setList(data)
        })

        return () => {
            io.off("nota:list")
        }
    }, [])

    return <InvoiceContext.Provider value={{ list, setList }}>{children}</InvoiceContext.Provider>
}
