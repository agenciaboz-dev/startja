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
    const active = location.pathname.split("/")[2] == sideBarItem.path.split("/")[1]

    const [collapse, setCollapse] = useState(active)

    const buildStyle = (active: boolean, sideBarItem: SidebarItem) => {
        const menuItemStyle: SxProps = {
            pointerEvents: active ? (sideBarItem.subItens ? "auto" : "none") : "auto",
            flexDirection: "column",
            fontWeight: active ? "600" : "400",
            whiteSpace: "normal",
            overflow: "hidden",
            textAlign: "center",
            ...sx,
        }

        return menuItemStyle
    }

    const handleMenuClick = (item: SidebarItem) => {
        if (!sideBarItem.subItens) {
            item.onClick()
        } else {
            item.onClick()
            // setCollapse((collapse) => !collapse)
        }
    }

    return (
        <>
            <Box
                onClick={() => handleMenuClick(sideBarItem)}
                sx={{
                    flexDirection: "column",
                    alignItems: "center",
                    pointerEvents: active ? (sideBarItem.subItens ? "auto" : "none") : "auto",
                    backgroundColor: active ? "#e8e8e8" : "",
                }}
            >
                <MenuItem key={sideBarItem.id} sx={buildStyle(active, sideBarItem)}>
                    <Box
                        sx={{
                            backgroundColor: active ? "secondary.main" : "",
                            color: active ? "white" : "black",
                            pointerEvents: active ? (sideBarItem.subItens ? "auto" : "none") : "auto",
                            padding: "0.5rem",
                            borderRadius: "10px",
                        }}
                    >
                        <Icon />
                    </Box>
                    {sideBarItem.name}
                    {/* {sideBarItem.subItens && <KeyboardArrowDown sx={{ marginLeft: "auto", rotate: collapse ? "-180deg" : "", transition: "0.3s" }} />} */}
                </MenuItem>
            </Box>
            <Collapse in={active}>
                <Box sx={{ flexDirection: "column", width: "100%", backgroundColor: "#e8e8e8" }}>
                    {sideBarItem.subItens?.map((sideBarItem) => {
                        const active = location.pathname.split("/")[2] == sideBarItem.path.split("/")[1]
                        const Icon = () => sideBarItem.icon
                        return (
                            <MenuItem
                                key={sideBarItem.id}
                                sx={{
                                    ...buildStyle(active, sideBarItem),
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
