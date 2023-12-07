import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { ReactSVG } from "react-svg"
import startjaIcon from "../../assets/startja_icon.svg"
import { useAdmSidebar } from "../../hooks/useAdmSidebar"
import { MenuButton } from "../MenuButton"

interface AdmSidebarProps {}

export const AdmSidebar: React.FC<AdmSidebarProps> = ({}) => {
    const admSideBar = useAdmSidebar()
    const isMobile = useMediaQuery("(orientation: portrait)")

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
