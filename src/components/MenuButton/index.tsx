import React, { useState } from "react"
import { Box, Collapse, MenuItem, SxProps } from "@mui/material"
import { useLocation } from "react-router-dom"
import { KeyboardArrowDown } from "@mui/icons-material"

interface MenuButtonProps {
    sideBarItem: SidebarItem
    sx?: SxProps
}

export const MenuButton: React.FC<MenuButtonProps> = ({ sideBarItem, sx }) => {
    const Icon = () => sideBarItem.icon
    const location = useLocation()
    const active = location.pathname.split("/")[1] == sideBarItem.path.split("/")[1]

    const [collapse, setCollapse] = useState(active)

    const buildStyle = (active: boolean, sideBarItem: SidebarItem) => {
        const menuItemStyle: SxProps = {
            // backgroundColor: active ? (menu.subItens ? "" : "secondary.main") : "",
            // color: active ? (menu.subItens ? "secondary.main" : "background.paper") : "secondary.main",
            // pointerEvents: active ? (menu.subItens ? "auto" : "none") : "auto",
            fontWeight: "bold",
            fontSize: "1vw",
            gap: "1vw",
            ...sx,
        }

        return menuItemStyle
    }

    const handleMenuClick = (item: SidebarItem) => {
        if (!sideBarItem.subItens) {
            item.onClick()
        } else {
            setCollapse((collapse) => !collapse)
        }
    }

    return (
        <>
            <MenuItem key={sideBarItem.id} sx={buildStyle(active, sideBarItem)} onClick={() => handleMenuClick(sideBarItem)}>
                <Icon />
                {sideBarItem.name}
                {sideBarItem.subItens && <KeyboardArrowDown sx={{ marginLeft: "auto", rotate: collapse ? "-180deg" : "", transition: "0.3s" }} />}
            </MenuItem>

            <Collapse in={collapse}>
                <Box sx={{ flexDirection: "column", width: "100%" }}>
                    {sideBarItem.subItens?.map((sideBarItem) => {
                        const active = location.pathname.split("/")[2] == sideBarItem.path.split("/")[1]
                        const Icon = () => sideBarItem.icon

                        return (
                            <MenuItem
                                key={sideBarItem.id}
                                sx={{
                                    ...buildStyle(active, sideBarItem),
                                    // paddingLeft: isMobile ? "14vw" : "3vw",
                                    // fontSize: isMobile ? "3.5vw" : "0.85vw",
                                    whiteSpace: "normal",
                                    overflow: "hidden",
                                }}
                                onClick={() => handleMenuClick(sideBarItem)}
                            >
                                <Icon />
                                {sideBarItem.name}
                            </MenuItem>
                        )
                    })}
                </Box>
            </Collapse>
        </>
    )
}
