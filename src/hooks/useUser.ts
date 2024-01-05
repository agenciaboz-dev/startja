import { useContext } from "react"
import UserContext from "../contexts/userContext"
import { useNavigate } from "react-router-dom"

export const useUser = () => {
    const navigate = useNavigate()
    const userContext = useContext(UserContext)
    const { setUser, setAdmin } = userContext

    const logout = () => {
        setUser(undefined)
        setAdmin(undefined)
        navigate("/")
    }

    return { ...userContext, logout }
}
