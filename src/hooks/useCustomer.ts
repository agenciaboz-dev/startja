import { useContext } from "react"
import CustomerContext from "../contexts/customerContext"
import { useIo } from "./useIo"

export const useCustomer = () => {
    const customerContext = useContext(CustomerContext)
    const { list, setList } = customerContext
    const io = useIo()

    const login = (data: LoginForm) => {
        io.emit("customer:login", data)
    }

    return { login, list, setList }
}
