import { useContext } from "react"
import CustomersListContext from "../contexts/customersListContext"

export const useCustomersList = () => {
    const customersListContext = useContext(CustomersListContext)
    const { list, setList } = customersListContext

    return { list, setList }
}
