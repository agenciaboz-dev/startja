import React, { useState } from "react"
import { Box } from "@mui/material"
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useNavigate } from "react-router-dom";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                height: "100%",
                width: "10%",
                backgroundColor: "white",
                boxShadow: "2px 0 2px 0 #d1d1d1",
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
                    gap: "2rem"
                }}
            >
                <Box
                    sx={{
                        flexDirection: "column",
                        gap: "0.5rem",
                        alignItems: "center",
                        marginTop: "auto",
                        cursor: "pointer",
                        textAlign: "center"
                    }}
                    onClick={() => navigate("/panel/visao-geral/")}
                >
                    <GridViewOutlinedIcon
                        sx={{
                            fill: "#000000",
                            width: "2rem",
                            height: "2rem"
                        }}
                    />
                    <p>
                        Visão Geral
                    </p>
                </Box>
                <Box
                    sx={{
                        flexDirection: "column",
                        gap: "0.5rem",
                        alignItems: "center",
                        marginTop: "auto",
                        cursor: "pointer",
                        textAlign: "center"
                    }}
                    onClick={() => navigate("/panel/notas-fiscais")}
                >
                    <ReceiptOutlinedIcon
                        sx={{
                            fill: "#000000",
                            width: "2rem",
                            height: "2rem"
                        }}
                    />
                    <p>
                        Emissão de Nota Fiscal
                    </p>
                </Box>
            </Box>

            <Box
                sx={{
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "center",
                    marginTop: "auto"
                }}
            >
                <SettingsOutlinedIcon
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