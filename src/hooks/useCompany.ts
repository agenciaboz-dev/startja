import { useContext } from "react"
import CompanyContext from "../contexts/companyContext"
import { useIo } from "./useIo"

export const useCompany = () => {
    const companyContext = useContext(CompanyContext)
    const { list, setList, selectedCompany, setSelectedCompany } = companyContext
    const io = useIo()

    const makeList = () => {
        io.emit("company:list", {})
    }

    return { makeList, list, setList, selectedCompany, setSelectedCompany }
}
