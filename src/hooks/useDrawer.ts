import { useContext } from "react"
import DrawerContext from "../contexts/drawerContext"

export const useDrawer = () => {
    const drawerContext = useContext(DrawerContext)
    const openDrawer = drawerContext.openDrawer
    const setOpenDrawer = drawerContext.setOpenDrawer

    return { openDrawer, setOpenDrawer }
}
