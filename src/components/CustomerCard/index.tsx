import React, { useEffect, useState } from "react"
import { Box, Button, IconButton, Avatar as MuiAvatar } from "@mui/material"
import { colors } from "../../style/colors"
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

interface CustomerCardProps {}

export const CustomerCard: React.FC<CustomerCardProps> = ({}) => {
    
    return (
        <Box
            sx={{
                height: "fit-content",
                width: "25%",
                backgroundColor: "white",
                borderRadius: "20px",
                boxShadow: "0 2px 2px 2px #d1d1d1",
                flexDirection: "column",
                padding: "1rem",
                gap: "1rem",
                color: colors.text.greyish
            }}
        >
            <Box
                sx={{
                    alignItems: "center",
                    gap: "1rem"
                }}
            >
                <MuiAvatar
                    sx={{
                        backgroundColor: colors.secondary
                    }}
                />
                <Box
                    sx={{
                        flexDirection: "column"
                    }}
                >
                    <p
                        style={{
                            color: colors.text.darkgrey
                        }}
                    >[Nome do Cliente]</p>
                    <p>Cliente há x dias</p>
                </Box>
            </Box>

            <Box
                sx={{
                    flexDirection: "column"
                }}
            >
                <Box
                    sx={{
                        gap: "1rem"
                    }}
                >
                    <p>CPF: 000.000.000-00</p>
                    <p>Cidade/UF</p>
                </Box>
                <p>Certificado digital expira em: 00/00/00</p>
            </Box>

            <Box
                sx={{
                    flexDirection: "column"
                }}
            >
                <p>cliente@email.com.br</p>
                <p>00 0 0000-0000</p>
            </Box>
            <Box
                sx={{
                    justifyContent: "space-between"
                }}
            >
                <IconButton
                    sx={{
                        backgroundColor: colors.secondary
                    }}
                >
                    <LinkOutlinedIcon
                        sx={{
                            color: "white"
                        }}
                    />
                </IconButton>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: "20px",
                        textTransform: "capitalize",
                        gap: "0.5rem"
                    }}
                >
                    <LoginOutlinedIcon />
                    <p>
                        Acessar Sistema
                    </p>
                </Button>
            </Box>
        </Box>
    )
}