import React from "react"
import { Box } from "@mui/material"
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { colors } from "../../style/colors"

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
    return (
        <Box
            sx={{
                height: "100%",
                width: "10%",
                backgroundColor: "white",
                boxShadow: "0 0 1rem 0 #d1d1d1",
                flexDirection: "column",
                alignItems: "center",
                padding: "2rem 0",
                gap: "2rem"
            }}
        >
            <img src="/src/assets/startja_icon.png" alt=""
                style={{
                    height: "5rem",
                    width: "5rem",
                    objectFit: "cover",
                }}
            />
            <hr
                style={{
                    width: "70%"
                }}
            />

            <Box
                sx={{
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "center",
                    marginTop: "auto"
                }}
            >
                <SettingsOutlinedIcon
                    // color="action"
                    sx={{
                        fill: "#000000",
                        width: "2rem",
                        height: "2rem"
                    }}
                />
                <p>
                    Configurações
                </p>
            </Box>
        </Box>
    )
}