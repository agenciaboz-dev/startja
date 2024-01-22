import { useContext } from "react"
import NatureContext from "../contexts/natureContext"

export const useNature = () => {
    const natureContext = useContext(NatureContext)
    const { list, setList, updateNature } = natureContext

    return { list, setList, updateNature }
}
