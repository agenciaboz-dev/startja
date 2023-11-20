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
                gap: "2rem",
            }}
        >
            <Box sx={{}}>
                <ReactSVG
                    src={startjaIcon}
                    style={{
                        transform: "scale(1.5)",
                    }}
                />
            </Box>
            <hr
                style={{
                    width: "70%",
                }}
            />
            <Box
                sx={{
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2rem",
                }}
            >
                {admSideBar.map((sideBarItem) => (
                    <MenuButton sideBarItem={sideBarItem} key={sideBarItem.id} />
                ))}
            </Box>
        </Box>
    )
}
