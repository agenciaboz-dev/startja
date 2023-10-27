import React, { useEffect, useState } from "react"
import { Box, Button, IconButton, Avatar as MuiAvatar } from "@mui/material"
import { colors } from "../../style/colors"
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

interface CustomerCardProps {
    customer : Customer
}

export const CustomerCard: React.FC<CustomerCardProps> = ({customer}) => {
    
    return (
        <Box
            sx={{
                height: "fit-content",
                // minWidth: "20%",
                // flex: 1,
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
                    >{customer.name}</p>
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
                    <p>CPF: {customer.cpf}</p>
                    <p>{customer.city}/{customer.state}</p>
                </Box>
                <p>Certificado digital expira em: 00/00/00</p>
            </Box>

            <Box
                sx={{
                    flexDirection: "column"
                }}
            >
                <p>{customer.email}</p>
                <p>{customer.phone}</p>
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