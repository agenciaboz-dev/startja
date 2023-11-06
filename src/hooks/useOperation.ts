import { useContext } from "react"
import OperationContext from "../contexts/operationContext"
import { useIo } from "./useIo"

export const useOperation = () => {
    const operationContext = useContext(OperationContext)
    const { list, setList } = operationContext
    const io = useIo()

    const makeList = () => {
        io.emit("operation:list", {})
    }

    return { makeList, list, setList }
}
