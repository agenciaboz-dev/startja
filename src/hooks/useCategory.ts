import { useContext } from "react"
import CategoryContext from "../contexts/categoryContext"
import { useIo } from "./useIo"

export const useCategory = () => {
    const categoryContext = useContext(CategoryContext)
    const { list, setList } = categoryContext
    const io = useIo()

    const makeList = () => {
        io.emit("category:list", {})
    }

    return { makeList, list, setList }
}
