import React, { useState } from "react"
import { Box, Collapse, MenuItem, SxProps, Tooltip, useMediaQuery } from "@mui/material"
import { useLocation } from "react-router-dom"
// import { KeyboardArrowDown } from "@mui/icons-material"
import { colors } from "../../style/colors"
import { useDrawer } from "../../hooks/useDrawer"
import { toolTipStyle } from "../../style/toolTipStyle"

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
            gap: "0.25vw",
            position: "relative",
            ...sx,
        }

        return menuItemStyle
    }

    const logoItem = sideBarItem.id == 1

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
                <Tooltip enterTouchDelay={100} title={logoItem && !isMobile ? <Box sx={toolTipStyle}>Configurações</Box> : ""}>
                    <MenuItem key={sideBarItem.id} sx={buildStyle(active, sideBarItem)}>
                        {active && !sideBarItem.subItens && (
                            <Box
                                sx={{
                                    backgroundColor: colors.primary,
                                    borderTopRightRadius: isMobile ? "2vw" : "1vw",
                                    borderBottomRightRadius: isMobile ? "2vw" : "1vw",
                                    position: "absolute",
                                    height: isMobile ? "14vw" : "3vw",
                                    width: isMobile ? "2vw" : "0.5vw",
                                    left: 0,
                                }}
                            ></Box>
                        )}
                        <Box
                            sx={{
                                backgroundColor: active ? "secondary.main" : "#f4f4f4",
                                color: active ? "white" : colors.text.darkgrey,
                                pointerEvents: disabled || active ? "none" : "auto",
                                padding: logoItem ? 0 : isMobile ? "2vw" : "0.5vw",
                                borderRadius: active ? "20px" : "50%",
                            }}
                        >
                            <Icon />
                        </Box>
                        {((!isMobile && !logoItem) || isMobile) && sideBarItem.name}
                        {/* {sideBarItem.subItens && <KeyboardArrowDown sx={{ marginLeft: "auto", rotate: collapse ? "-180deg" : "", transition: "0.3s" }} />} */}
                    </MenuItem>
                </Tooltip>
            </Box>
            <Collapse in={active}>
                <Box
                    sx={{
                        flexDirection: "column",
                        width: "100%",
                        backgroundColor: colors.background2,
                        borderRadius: isMobile ? "10vw" : "2vw",
                    }}
                >
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
                                    }}
                                    onClick={() => handleMenuClick(sideBarItem)}
                                >
                                    {active && (
                                        <Box
                                            sx={{
                                                backgroundColor: colors.primary,
                                                borderTopRightRadius: isMobile ? "2vw" : "1vw",
                                                borderBottomRightRadius: isMobile ? "2vw" : "1vw",
                                                position: "absolute",
                                                height: isMobile ? "14vw" : "3vw",
                                                width: isMobile ? "2vw" : "0.5vw",
                                                left: 0,
                                            }}
                                        ></Box>
                                    )}
                                    <Box
                                        sx={{
                                            backgroundColor: active ? "secondary.main" : "#f4f4f4",
                                            color: active ? "white" : colors.text.darkgrey,
                                            pointerEvents: active ? "none" : "auto",
                                            padding: isMobile ? "2vw" : "0.5vw",
                                            borderRadius: active ? "20px" : "50%",
                                        }}
                                    >
                                        <Icon />
                                    </Box>
                                    {sideBarItem.name}
                                </MenuItem>
                            </Box>
                        )
                    })}
                </Box>
            </Collapse>
        </Box>
    )
}
