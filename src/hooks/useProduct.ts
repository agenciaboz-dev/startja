import { useContext } from "react"
import ProductContext from "../contexts/productContext"
import { useIo } from "./useIo"

export const useProduct = () => {
    const productContext = useContext(ProductContext)
    const { list, setList, addProduct } = productContext
    const io = useIo()

    const makeList = () => {
        io.emit("product:list", {})
    }

    const find = (id: number) => list.find((item) => item.id === id)

    return { makeList, list, setList, find, addProduct }
}
