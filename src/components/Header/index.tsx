import React from "react"
import { Box, Menu, MenuItem, SxProps } from "@mui/material"
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined"
import { useHeader } from "../../hooks/useHeader"
import { useMenus } from "../../hooks/useMenus"
import { useUser } from "../../hooks/useUser"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    const { title } = useHeader()
    const menus = useMenus()
    const { user } = useUser()

    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null)
    const menu_opened = Boolean(menuAnchorEl)

    return (
        <Box sx={{ justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <h1>{title}</h1>
            <Box sx={{ alignItems: "center", height: "100%" }}>
                <MenuItem
                    sx={{
                        alignItems: "center",
                        gap: "0.5vw",
                        paddingRight: "2vw",
                        height: "100%",
                        borderRight: "1px solid",
                    }}
                >
                    <HelpOutlineOutlinedIcon sx={{ fill: "#323232", height: "2vw", width: "2vw" }} />
                    <p style={{ fontWeight: "lighter" }}>Ajuda</p>
                </MenuItem>
                <MenuItem
                    sx={{ alignItems: "center", gap: "0.5vw", width: "15vw", paddingLeft: "2vw" }}
                    onClick={(event) => setMenuAnchorEl(event.currentTarget)}
                >
                    <AccountCircleOutlinedIcon sx={{ fill: "#323232", height: "2vw", width: "2vw" }} />
                    <Box sx={{ flexDirection: "column" }}>
                        <p style={{ fontWeight: "lighter" }}>{user?.name}</p>
                        <p style={{ fontSize: "1rem", fontWeight: "bold" }}>Menus e configurações</p>
                    </Box>
                    <ArrowDropDownOutlinedIcon />
                </MenuItem>
                <Menu
                    anchorEl={menuAnchorEl}
                    open={menu_opened}
                    onClose={() => setMenuAnchorEl(null)}
                    slotProps={{ paper: { sx: { width: "15vw" }, elevation: 3 } }}
                    MenuListProps={{ sx: { width: "100%" } }}
                >
                    {menus.list.map((menu) => {
                        const Icon = () => menu.icon
                        return (
                            <MenuItem sx={{ gap: "1vw" }} onClick={menu.onClick} key={menu.id}>
                                <Icon /> {menu.title}
                            </MenuItem>
                        )
                    })}
                </Menu>
            </Box>
        </Box>
    )
}