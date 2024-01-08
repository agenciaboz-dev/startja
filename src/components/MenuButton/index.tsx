import React, { useState } from "react"
import { Box, Collapse, MenuItem, SxProps, useMediaQuery } from "@mui/material"
import { useLocation } from "react-router-dom"
// import { KeyboardArrowDown } from "@mui/icons-material"
import { colors } from "../../style/colors"
import { useDrawer } from "../../hooks/useDrawer"

interface MenuButtonProps {
    sideBarItem: SidebarItem
    sx?: SxProps
}

export const MenuButton: React.FC<MenuButtonProps> = ({ sideBarItem, sx }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const Icon = () => sideBarItem.icon
    const location = useLocation()
    const { setOpenDrawer } = useDrawer()
    const active = location.pathname.split("/")[2] == sideBarItem.path.split("/")[1]
    const disabled = sideBarItem.disabled

    // const [collapse, setCollapse] = useState(active)

    const buildStyle = (active: boolean, sideBarItem: SidebarItem) => {
        const menuItemStyle: SxProps = {
            flexDirection: "column",
            whiteSpace: "normal",
            overflow: "hidden",
            textAlign: "center",
            width: "100%",
            fontSize: "1rem",
            color: colors.text.greyish,
            gap: "0.5vw",
            ...sx,
        }

        return menuItemStyle
    }

    const handleMenuClick = (item: SidebarItem) => {
        // if (!sideBarItem.subItens) {
        //     item.onClick()
        // } else {
        //     item.onClick()
        //     setCollapse((collapse) => !collapse)
        // }
        item.onClick()
        setTimeout(() => {
            setOpenDrawer(false)
        }, 500)
    }

    return (
        <Box
            sx={{
                flexDirection: "column",
                width: "100%",
            }}
        >
            <Box
                onClick={() => handleMenuClick(sideBarItem)}
                sx={{
                    alignItems: "center",
                    pointerEvents: disabled || active ? "none" : "auto",
                    backgroundColor: active ? (sideBarItem.subItens ? "#e8e8e8" : "") : "",
                    position: "relative",
                    display: active ? (sideBarItem.subItens ? "none" : "") : "",
                }}
            >
                <MenuItem key={sideBarItem.id} sx={buildStyle(active, sideBarItem)}>
                    <Box
                        sx={{
                            position: "relative",
                        }}
                    >
                        {active && !sideBarItem.subItens && (
                            <Box
                                sx={{
                                    backgroundColor: colors.primary,
                                    borderTopRightRadius: isMobile ? "2.5vw" : "1vw",
                                    borderBottomRightRadius: isMobile ? "2.5vw" : "1vw",
                                    position: "absolute",
                                    height: "100%",
                                    width: isMobile ? "2.5vw" : "0.5vw",
                                    left: isMobile ? "-30vw" : "-2vw",
                                }}
                            ></Box>
                        )}
                        <Box
                            sx={{
                                backgroundColor: active ? "secondary.main" : "#f4f4f4",
                                color: active ? "white" : colors.text.darkgrey,
                                pointerEvents: disabled || active ? "none" : "auto",
                                padding: "0.5vw",
                                borderRadius: "20px",
                            }}
                        >
                            <Icon />
                        </Box>
                    </Box>
                    {sideBarItem.name}
                    {/* {sideBarItem.subItens && <KeyboardArrowDown sx={{ marginLeft: "auto", rotate: collapse ? "-180deg" : "", transition: "0.3s" }} />} */}
                </MenuItem>
            </Box>
            <Collapse in={active}>
                <Box sx={{ flexDirection: "column", width: "100%", backgroundColor: "#e8e8e8" }}>
                    {sideBarItem.subItens?.map((sideBarItem) => {
                        const active = location.pathname.split("/")[3] == sideBarItem.path.split("/")[1]
                        const Icon = () => sideBarItem.icon
                        return (
                            <Box
                                key={sideBarItem.id}
                                sx={{
                                    alignItems: "center",
                                    position: "relative",
                                    pointerEvents: active ? "none" : "auto",
                                }}
                            >
                                <MenuItem
                                    key={sideBarItem.id}
                                    sx={{
                                        ...buildStyle(active, sideBarItem),
                                        whiteSpace: "normal",
                                        overflow: "hidden",
                                    }}
                                    onClick={() => handleMenuClick(sideBarItem)}
                                >
                                    <Box
                                        sx={{
                                            position: "relative",
                                        }}
                                    >
                                        {active && (
                                            <Box
                                                sx={{
                                                    backgroundColor: colors.primary,
                                                    borderTopRightRadius: isMobile ? "2.5vw" : "1vw",
                                                    borderBottomRightRadius: isMobile ? "2.5vw" : "1vw",
                                                    position: "absolute",
                                                    height: "100%",
                                                    width: isMobile ? "2.5vw" : "0.5vw",
                                                    left: isMobile ? "-30vw" : "-2vw",
                                                }}
                                            ></Box>
                                        )}
                                        <Box
                                            sx={{
                                                backgroundColor: active ? "secondary.main" : "#f4f4f4",
                                                color: active ? "white" : colors.text.darkgrey,
                                                pointerEvents: active ? "none" : "auto",
                                                padding: "0.5vw",
                                                borderRadius: "20px",
                                            }}
                                        >
                                            <Icon />
                                        </Box>
                                    </Box>
                                    {active && sideBarItem.name}
                                </MenuItem>
                            </Box>
                        )
                    })}
                </Box>
            </Collapse>
        </Box>
    )
}
