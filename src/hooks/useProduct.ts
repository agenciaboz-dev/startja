import { useContext } from "react"
import ProductContext from "../contexts/productContext"
import { useIo } from "./useIo"

export const useProduct = () => {
    const productContext = useContext(ProductContext)
    const { list, setList } = productContext
    const io = useIo()

    const makeList = () => {
        io.emit("product:list", {})
    }

    return { makeList, list, setList }
}
