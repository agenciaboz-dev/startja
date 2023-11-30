import React from "react"
import { Box } from "@mui/material"
import { ReactSVG } from "react-svg"
import startjaIcon from "../../assets/startja_icon.svg"
import { useSidebar } from "../../hooks/useSidebar"
import { MenuButton } from "../MenuButton"

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
    const sidebar = useSidebar()

    return (
        <Box
            sx={{
                height: "100%",
                width: "7%",
                backgroundColor: "white",
                boxShadow: "2px 0 2px 0 #d1d1d1",
                flexDirection: "column",
                alignItems: "center",
                padding: "2vw 0",
            }}
        >
            <Box
                sx={{
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {sidebar.map((sideBarItem) => (
                    <MenuButton sideBarItem={sideBarItem} key={sideBarItem.id} />
                ))}
            </Box>
        </Box>
    )
}
