import { useContext } from "react"
import NatureContext from "../contexts/NatureContext"
import { useIo } from "./useIo"

export const useNature = () => {
    const NatureContext = useContext(NatureContext)
    const { list, setList } = NatureContext
    const io = useIo()

    const makeList = () => {
        io.emit("Nature:list", {})
    }

    return { makeList, list, setList }
}
