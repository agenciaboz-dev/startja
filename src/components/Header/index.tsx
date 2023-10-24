import React from "react"
import { Box } from "@mui/material"
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { colors } from "../../style/colors"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    return (
        <Box
            sx={{
                padding: "2rem",
                justifyContent: "space-between",
                alignItems: "center",
                height: "6rem",
                width: "100%"
            }}
        >
            <h1>Título</h1>
            <Box
                sx={{
                    gap: "2rem"
                }}
            >
                <Box
                    sx={{
                        alignItems: "center",
                        gap: "0.5rem"
                    }}
                >
                    <HelpOutlineOutlinedIcon
                        sx={{
                            fill: "#323232",
                            height: "2rem",
                            width: "2rem"
                        }}
                    />
                    <p>Ajuda</p>
                </Box>
                <hr />
                <Box>
                    <AccountCircleOutlinedIcon />
                    <Box
                        sx={{
                            flexDirection: "column"
                        }}
                    >
                        <p>Nome do Usuário</p>
                        <p>Menus e configurações</p>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}