import { useContext } from "react"
import InvoiceContext from "../contexts/invoiceContext"
import { useIo } from "./useIo"

export const useInvoice = () => {
    const invoiceContext = useContext(InvoiceContext)
    const { list, setList } = invoiceContext
    const io = useIo()

    const makeList = () => {
        io.emit("invoice:list", {})
    }

    return { makeList, list, setList }
}
