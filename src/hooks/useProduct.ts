import { useContext } from "react"
import ProductContext from "../contexts/productContext"
import { useIo } from "./useIo"
import { useInvoice } from "./useInvoice"

export const useProduct = () => {
    const productContext = useContext(ProductContext)
    const { list, setList, addProduct, deleteProduct } = productContext
    const invoices = useInvoice()
    const io = useIo()

    const makeList = () => {
        io.emit("product:list", {})
    }

    const find = (id: number) => list.find((item) => item.id === id)

    const isPresentOnInvoice = (product: Product) => {
        const exists = !!invoices.list.find((invoice) => !!invoice.products.find((item) => item.produtoId == product.id))
        return exists
    }

    return { makeList, list, setList, find, addProduct, isPresentOnInvoice, deleteProduct }
}
