import React from "react"
import { Box } from "@mui/material"
import startjaIcon from "../../assets/startja_icon.svg"
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined"
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined"
import BookOutlinedIcon from "@mui/icons-material/BookOutlined"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import { useNavigate } from "react-router-dom"
import { ReactSVG } from "react-svg"
import { useSidebar } from "../../hooks/useSidebar"
import { MenuButton } from "../MenuButton"

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
    const navigate = useNavigate()
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
                    gap: "1rem",
                }}
            >
                {sidebar.map((sideBarItem) => (
                    <MenuButton sideBarItem={sideBarItem} key={sideBarItem.id} />
                ))}
            </Box>
        </Box>
    )
}
