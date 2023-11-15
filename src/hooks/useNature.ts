import { useContext } from "react"
import NatureContext from "../contexts/natureContext"
import { useIo } from "./useIo"

export const useNature = () => {
    const natureContext = useContext(NatureContext)
    const { list, setList } = natureContext
    const io = useIo()

    const makeList = () => {
        io.emit("Nature:list", {})
    }

    return { makeList, list, setList }
}
