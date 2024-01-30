import { createContext, useEffect, useState } from 'react'
import React from 'react'
import { useIo } from '../hooks/useIo';

interface ProductContextValue {
    list: Product[]
    setList: (value: Product[]) => void
    addProduct: (product: Product) => void
    deleteProduct: (product: Product) => void
}

interface ProductProviderProps {
    children: React.ReactNode
}

const ProductContext = createContext<ProductContextValue>({} as ProductContextValue)

export default ProductContext

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [list, setList] = useState<Product[]>([])
    const io = useIo()

    const addProduct = (product: Product) => {
        setList((list) => [...list.filter((item) => item.id != product.id), product])
    }

    const deleteProduct = (product: Product) => {
        setList((list) => list.filter((item) => item.id != product.id))
    }

    useEffect(() => {
        console.log({ products: list })
    }, [list])

    useEffect(() => {
        io.on("product:new", (product: Product) => {
            addProduct(product)
        })

        io.on("product:update", (product: Product) => {
            addProduct(product)
        })

        io.on("product:delete", (product: Product) => {
            deleteProduct(product)
        })

        return () => {
            io.off("product:new")
            io.off("product:update")
            io.off("product:delete")
        }
    }, [list])

    useEffect(() => {
        io.on("product:list", (data) => {
            setList(data.product)
        })

        io.emit("product:list")

        return () => {
            io.off("product:list")
        }
    }, [])

    return <ProductContext.Provider value={{ list, setList, addProduct, deleteProduct }}>{children}</ProductContext.Provider>
}