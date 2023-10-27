import React from "react"
import { Box } from "@mui/material"
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'
import { colors } from "../../style/colors"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    return (
        <Box
            sx={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%"
            }}
        >
            <h1>Título</h1>
            <Box
                sx={{
                    gap: "2rem",
                    alignItems: "center",
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
                    <p
                        style={{
                            fontWeight: "lighter"
                        }}
                        >
                        Ajuda
                    </p>
                </Box>
                <hr
                    style={{
                        height: "2rem"
                    }}
                />
                <Box
                    sx={{
                        alignItems: "center",
                        gap: "0.5rem"
                    }}
                >
                    <AccountCircleOutlinedIcon
                        sx={{
                            fill: "#323232",
                            height: "2rem",
                            width: "2rem"
                        }}
                    />
                    <Box
                        sx={{
                            flexDirection: "column",
                        }}
                        >
                        <p
                            style={{
                                fontWeight: "lighter"
                            }}
                        >
                            [Nome do Usuário]
                        </p>
                        <p
                            style={{
                                fontSize: "0.8rem",
                                fontWeight: "bold"
                            }}
                        >
                            Menus e configurações
                        </p>
                    </Box>
                </Box>
                <ArrowDropDownOutlinedIcon />
            </Box>
        </Box>
    )
}