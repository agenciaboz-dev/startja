import LogoutIcon from "@mui/icons-material/Logout"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { useUser } from "./useUser"

export const useMenus = () => {
    const user = useUser()

    const list: UserMenu[] = [
        {
            id: 1,
            title: "Minha Conta",
            icon: <AccountCircleIcon />,
            onClick: () => {}
        },
        {
            id: 2,
            title: "Sair",
            icon: <LogoutIcon />,
            onClick: () => user.logout()
        }
    ]

    return { list }
}
