import { createContext, useEffect, useState } from 'react'
import React from 'react'
import { useIo } from '../hooks/useIo';

interface OperationContextValue {
    list: Operation[];
    setList: (value:Operation[]) => void;
}

interface OperationProviderProps {
    children: React.ReactNode
}

const OperationContext = createContext<OperationContextValue>({} as OperationContextValue);

export default OperationContext

export const OperationProvider:React.FC<OperationProviderProps> = ({children}) => {
    const [list, setList] = useState<Operation[]>([])
    const io = useIo()

    useEffect(() => {
        console.log({operations:list})
    },[list])

    useEffect(() => {
        io.on('operation:list', (data) =>{
            setList(data)
        })

        return () => {
            io.off('operation:list')
        }
    },[])

    return (
         <OperationContext.Provider value={{list, setList}}>
              {children}
         </OperationContext.Provider>
    )
}