import React from "react"
import { Box } from "@mui/material"
import { useSidebar } from "../../hooks/useSidebar"
import { MenuButton } from "../MenuButton"

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
    const sidebar = useSidebar()

    return (
        <Box
            sx={{
                height: "100%",
                width: "7vw",
                backgroundColor: "white",
                boxShadow: "2px 0 2px 0 #d1d1d1",
                flexDirection: "column",
                alignItems: "center",
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
