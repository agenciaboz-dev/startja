import React from "react"
import { Box, IconButton, Menu, MenuItem, SxProps, useMediaQuery } from "@mui/material"
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined"
import { useHeader } from "../../hooks/useHeader"
import { useMenus } from "../../hooks/useMenus"
import { useUser } from "../../hooks/useUser"
import MenuIcon from "@mui/icons-material/Menu"
import { useDrawer } from "../../hooks/useDrawer"
import { colors } from "../../style/colors"
import { useHelpMenu } from "../../hooks/useHelpMenu"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { title } = useHeader()
    const helpMenu = useHelpMenu()
    const menus = useMenus()
    const { user, admin } = useUser()
    const drawer = useDrawer()

    const [helpMenuAnchorEl, setHelpMenuAnchorEl] = React.useState<null | HTMLElement>(null)
    const help_menu_opened = Boolean(helpMenuAnchorEl)

    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null)
    const menu_opened = Boolean(menuAnchorEl)

    return (
        <Box
            sx={{
                flexDirection: isMobile ? "column" : "",
                alignItems: isMobile ? "center" : "",
                gap: isMobile ? "5vw" : "",
                textAlign: "center",
            }}
        >
            <Box sx={{ justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                {isMobile && (
                    <IconButton
                        sx={{
                            padding: 0,
                            color: colors.text.darkgrey,
                        }}
                    >
                        <MenuIcon sx={{ transform: "scale(2)", marginLeft: "2vw" }} onClick={() => drawer.setOpenDrawer(true)} />
                    </IconButton>
                )}
                {!isMobile && <h1>{title}</h1>}
                <Box sx={{ alignItems: "center", height: "100%" }}>
                    <MenuItem
                        sx={{
                            alignItems: "center",
                            gap: isMobile ? "5vw" : "0.5vw",
                            padding: 0,
                            paddingRight: "2vw",
                            height: "100%",
                            borderRight: "1px solid",
                        }}
                        onClick={(event) => setHelpMenuAnchorEl(event.currentTarget)}
                    >
                        <HelpOutlineOutlinedIcon sx={{ fill: "#323232", height: "2vw", width: "2vw", transform: isMobile ? "scale(3)" : "" }} />
                        <p style={{ fontWeight: "lighter" }}>Ajuda</p>
                    </MenuItem>
                    <Menu
                        anchorEl={helpMenuAnchorEl}
                        open={help_menu_opened}
                        onClose={() => setHelpMenuAnchorEl(null)}
                        slotProps={{ paper: { elevation: 3 } }}
                        MenuListProps={{ sx: { width: "100%" } }}
                    >
                        {helpMenu.list.map((helpMenuItem) => {
                            const Icon = () => helpMenuItem.icon
                            return (
                                <MenuItem sx={{ gap: "1vw" }} onClick={helpMenuItem.onClick} key={helpMenuItem.id}>
                                    <Icon /> {helpMenuItem.title}
                                </MenuItem>
                            )
                        })}
                    </Menu>
                    <MenuItem
                        sx={{
                            alignItems: "center",
                            gap: "0.5vw",
                            padding: 0,
                            paddingLeft: isMobile ? "5vw" : "2vw",
                        }}
                        onClick={(event) => setMenuAnchorEl(event.currentTarget)}
                    >
                        <AccountCircleOutlinedIcon
                            sx={{
                                fill: "#323232",
                                height: "2vw",
                                width: "2vw",
                                transform: isMobile ? "scale(3)" : "",
                                marginRight: isMobile ? "5vw" : "",
                            }}
                        />
                        <Box sx={{ flexDirection: "column" }}>
                            <p style={{ fontWeight: "lighter" }}>{admin?.name || user?.name}</p>
                            <p style={{ fontSize: "1rem", fontWeight: "bold" }}>Menus e configurações</p>
                        </Box>
                        <ArrowDropDownOutlinedIcon />
                    </MenuItem>
                    <Menu
                        anchorEl={menuAnchorEl}
                        open={menu_opened}
                        onClose={() => setMenuAnchorEl(null)}
                        slotProps={{ paper: { elevation: 3 } }}
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
            {isMobile && <h1>{title}</h1>}
        </Box>
    )
}