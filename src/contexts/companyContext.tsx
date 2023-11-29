import { createContext, useEffect, useState } from 'react'
import React from 'react'
import { useIo } from '../hooks/useIo';

interface CompanyContextValue {
    list: Company[]
    setList: React.Dispatch<React.SetStateAction<Company[]>>

    selectedCompany: Company | null
    setSelectedCompany: React.Dispatch<React.SetStateAction<Company | null>>
}

interface CompanyProviderProps {
    children: React.ReactNode
}

const CompanyContext = createContext<CompanyContextValue>({} as CompanyContextValue)

export default CompanyContext

export const CompanyProvider: React.FC<CompanyProviderProps> = ({ children }) => {
    const io = useIo()

    const [list, setList] = useState<Company[]>([])
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

    useEffect(() => {
        console.log({ companies: list })
        io.on("company:new", (company: Company) => {
            console.log({ new_company: company })
            setList((previousList) => {
                console.log({ previousList })

                return [...previousList, company]
            })
        })

        return () => {
            io.off("company:new")
        }
    }, [list])

    useEffect(() => {
        io.on("company:list", (data) => {
            setList(data)
        })

        return () => {
            io.off("company:list")
        }
    }, [])

    return <CompanyContext.Provider value={{ list, setList, selectedCompany, setSelectedCompany }}>{children}</CompanyContext.Provider>
}