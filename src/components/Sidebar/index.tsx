import React from "react"
import { Box, Drawer, useMediaQuery } from "@mui/material"
import { useSidebar } from "../../hooks/useSidebar"
import { MenuButton } from "../MenuButton"
import { useDrawer } from "../../hooks/useDrawer"

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const sidebar = useSidebar()
    const drawer = useDrawer()

    return isMobile ? (
        <Drawer anchor={"left"} open={drawer.openDrawer} onClose={() => drawer.setOpenDrawer(false)} sx={{}}>
            <Box
                sx={{
                    height: "100%",
                    width: "70vw",
                    backgroundColor: "white",
                    flexDirection: "column",
                    alignItems: "center",
                    overflow: "auto",
                    paddingTop: "5vw",
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
        </Drawer>
    ) : (
        <Box
            sx={{
                height: "100%",
                width: "10vw",
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
