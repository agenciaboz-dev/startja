import { useContext } from "react"
import CustomerContext from "../contexts/customerContext"

export const useCustomer = () => {
    const customerContext = useContext(CustomerContext)
    const { list, setList } = customerContext


    return { list, setList }
}
