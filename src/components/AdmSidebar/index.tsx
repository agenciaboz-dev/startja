import React from "react"
import { ReactSVG } from "react-svg"
import { Box } from "@mui/material"
import startjaIcon from "../../assets/startja_icon.svg"
import { MenuButton } from "../MenuButton"
import { useAdmSidebar } from "../../hooks/useAdmSidebar"

interface AdmSidebarProps {}

export const AdmSidebar: React.FC<AdmSidebarProps> = ({}) => {
    const admSideBar = useAdmSidebar()

    return (
        <Box
            sx={{
                height: "100%",
                width: "7%",
                backgroundColor: "white",
                boxShadow: "2px 0 2px 0 #d1d1d1",
                flexDirection: "column",
                alignItems: "center",
                padding: "2rem 0",
            }}
        >
            <Box
                sx={{
                    marginBottom: "0.5rem",
                }}
            >
                <ReactSVG src={startjaIcon} />
            </Box>
            <Box
                sx={{
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                }}
            >
                {admSideBar.map((sideBarItem) => (
                    <MenuButton sideBarItem={sideBarItem} key={sideBarItem.id} />
                ))}
            </Box>
        </Box>
    )
}
