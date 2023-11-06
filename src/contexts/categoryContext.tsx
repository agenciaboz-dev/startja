import { createContext, useEffect, useState } from 'react'
import React from 'react'
import { useIo } from '../hooks/useIo';

interface CategoryContextValue {
    list: Category[];
    setList: (value:Category[]) => void;
}

interface CategoryProviderProps {
    children: React.ReactNode
}

const CategoryContext = createContext<CategoryContextValue>({} as CategoryContextValue);

export default CategoryContext

export const CategoryProvider:React.FC<CategoryProviderProps> = ({children}) => {
    const [list, setList] = useState<Category[]>([])
    const io = useIo()

    useEffect(() => {
        console.log({categories:list})
    },[list])

    useEffect(() => {
        io.on('category:list', (data) =>{
            setList(data)
        })

        return () => {
            io.off('category:list')
        }
    },[])

    return (
         <CategoryContext.Provider value={{list, setList}}>
              {children}
         </CategoryContext.Provider>
    )
}