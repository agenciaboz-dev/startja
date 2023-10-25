import React, { useState } from "react"
import { Box } from "@mui/material"
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import FilterVintageOutlinedIcon from '@mui/icons-material/FilterVintageOutlined';
import { useNavigate } from "react-router-dom";

interface AdmSidebarProps {}

export const AdmSidebar: React.FC<AdmSidebarProps> = ({}) => {
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
                        cursor: "pointer"
                    }}
                    onClick={() => navigate("/admcustomers/")}
                >
                    <PeopleOutlinedIcon
                        sx={{
                            fill: "#000000",
                            width: "2rem",
                            height: "2rem"
                        }}
                    />
                    <p>
                        Clientes
                    </p>
                </Box>
                <Box
                    sx={{
                        flexDirection: "column",
                        gap: "0.5rem",
                        alignItems: "center",
                        marginTop: "auto",
                        cursor: "pointer"
                    }}
                    onClick={() => navigate("/admproducts/")}
                >
                    <FilterVintageOutlinedIcon
                        sx={{
                            fill: "#000000",
                            width: "2rem",
                            height: "2rem"
                        }}
                    />
                    <p>
                        Produtos
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