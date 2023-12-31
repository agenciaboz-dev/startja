import { createContext, useEffect, useState } from 'react'
import React from 'react'
import { useIo } from '../hooks/useIo';

interface ProductContextValue {
    list: Product[];
    setList: (value:Product[]) => void;
}

interface ProductProviderProps {
    children: React.ReactNode
}

const ProductContext = createContext<ProductContextValue>({} as ProductContextValue);

export default ProductContext

export const ProductProvider:React.FC<ProductProviderProps> = ({children}) => {
    const [list, setList] = useState<Product[]>([])
    const io = useIo()

    useEffect(() => {
        console.log({ products: list })
    }, [list])

    useEffect(() => {
        io.on("product:new", (product: Product) => {
            setList((list) => [...list, product])
        })

        return () => {
            io.off("product:new")
        }
    }, [list])

    useEffect(() => {
        io.on('product:list', (data) =>{
            setList(data.product)
        })

        io.emit("product:list")

        return () => {
            io.off('product:list')
        }
    },[])

    return (
         <ProductContext.Provider value={{list, setList}}>
              {children}
         </ProductContext.Provider>
    )
}