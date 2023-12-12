import React, { useState } from "react"
import { Box, Drawer, useMediaQuery } from "@mui/material"
import { ReactSVG } from "react-svg"
import startjaIcon from "../../assets/startja_icon.svg"
import { useAdmSidebar } from "../../hooks/useAdmSidebar"
import { MenuButton } from "../MenuButton"
import { useDrawer } from "../../hooks/useDrawer"

interface AdmSidebarProps {}

export const AdmSidebar: React.FC<AdmSidebarProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const admSideBar = useAdmSidebar()
    // const [openDrawer, setOpenDrawer] = useState(true)
    const drawer = useDrawer()

    return isMobile ? (
        <Drawer anchor={"left"} open={drawer.openDrawer} onClose={() => drawer.setOpenDrawer(false)} sx={{}}>
            <Box
                sx={{
                    height: "100%",
                    width: "50vw",
                    backgroundColor: "white",
                    flexDirection: "column",
                    alignItems: "center",
                    overflow: "auto",
                    paddingTop: "5vw",
                }}
            >
                <Box
                    sx={{
                        marginBottom: "0.5vw",
                    }}
                >
                    <ReactSVG src={startjaIcon} />
                </Box>
                <Box
                    sx={{
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {admSideBar.map((sideBarItem) => (
                        <MenuButton sideBarItem={sideBarItem} key={sideBarItem.id} />
                    ))}
                </Box>
            </Box>
        </Drawer>
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
                    marginBottom: "0.5vw",
                }}
            >
                <ReactSVG src={startjaIcon} />
            </Box>
            <Box
                sx={{
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {admSideBar.map((sideBarItem) => (
                    <MenuButton sideBarItem={sideBarItem} key={sideBarItem.id} />
                ))}
            </Box>
        </Box>
    )
}
