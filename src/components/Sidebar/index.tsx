import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { useSidebar } from "../../hooks/useSidebar"
import { MenuButton } from "../MenuButton"

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const sidebar = useSidebar()

    return isMobile ? (
        <Box sx={{}}></Box>
    ) : (
        <Box
            sx={{
                height: "100%",
                width: "7vw",
                backgroundColor: "white",
                boxShadow: "0 2px 2px 2px #d1d1d1",
                flexDirection: "column",
                alignItems: "center",
                overflow: "auto",
            }}
        >
            <Box
                sx={{
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                {sidebar.map((sideBarItem) => (
                    <MenuButton sideBarItem={sideBarItem} key={sideBarItem.id} />
                ))}
            </Box>
        </Box>
    )
}
