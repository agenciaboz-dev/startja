import React, { useState } from "react"
import { Box } from "@mui/material"
import DomainAddOutlinedIcon from "@mui/icons-material/DomainAddOutlined"
import { useNavigate } from "react-router-dom"

interface RegistrySidebarProps {}

export const RegistrySidebar: React.FC<RegistrySidebarProps> = ({}) => {
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                height: "100%",
                width: "12%",
                backgroundColor: "white",
                boxShadow: "0 0 2px 2px #d1d1d1",
                flexDirection: "column",
                alignItems: "center",
                padding: "2rem 0",
                gap: "2rem",
                borderRadius: "30px",
            }}
        >
            <Box
                sx={{
                    flexDirection: "column",
                    gap: "2rem",
                }}
            >
                <Box
                    sx={{
                        gap: "0.5rem",
                        alignItems: "center",
                        marginTop: "auto",
                        cursor: "pointer",
                        textAlign: "center",
                    }}
                    onClick={() => navigate("/painel/visao-geral/")}
                >
                    <DomainAddOutlinedIcon
                        sx={{
                            fill: "#000000",
                            width: "2rem",
                            height: "2rem",
                        }}
                    />
                    <p>Pessoas e empresas</p>
                </Box>
            </Box>
        </Box>
    )
}
