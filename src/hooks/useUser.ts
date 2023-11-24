import { useContext } from "react"
import UserContext from "../contexts/userContext"
import { useNavigate } from "react-router-dom"

export const useUser = () => {
    const navigate = useNavigate()
    const userContext = useContext(UserContext)
    const { user, setUser } = userContext

    const logout = () => {
        setUser(null)
        navigate("/")
    }

    return { user, setUser, logout }
}
