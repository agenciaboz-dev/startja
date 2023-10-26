import { createContext, useState } from 'react'
import React from 'react'

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

    return (
         <CustomerContext.Provider value={{list, setList}}>
              {children}
         </CustomerContext.Provider>
    )
}