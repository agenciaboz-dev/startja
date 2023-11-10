import { createContext, useEffect, useState } from 'react'
import React from 'react'
import { useIo } from '../hooks/useIo';

interface CustomerContextValue {
    list: Customer[];
    setList: (value:Customer[]) => void;
}

interface CustomerProviderProps {
    children: React.ReactNode
}

const CustomerContext = createContext<CustomerContextValue>({} as CustomerContextValue);

export default CustomerContext

export const CustomerProvider:React.FC<CustomerProviderProps> = ({children}) => {
    const [list, setList] = useState<Customer[]>([])
    const io = useIo()

    useEffect(() => {
        console.log({list})
    },[list])

    useEffect(() => {
        io.on('customer:list', (data) =>{
            setList(data)
        })

        return () => {
            io.off('customer:list')
        }
    },[])

    return (
         <CustomerContext.Provider value={{list, setList}}>
              {children}
         </CustomerContext.Provider>
    )
}