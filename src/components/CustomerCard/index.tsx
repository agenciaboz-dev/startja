import React from "react"
import { AlertColor, Box, Button, Grid, IconButton, Avatar as MuiAvatar } from "@mui/material"
import { colors } from "../../style/colors"
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SettingsPhoneOutlinedIcon from '@mui/icons-material/SettingsPhoneOutlined';
import { useNavigate } from "react-router-dom";

interface CustomerCardProps {
    customer : Customer
    buttonColor: AlertColor | 'primary' | 'secondary'
}

export const CustomerCard: React.FC<CustomerCardProps> = ({customer, buttonColor}) => {
    const navigate = useNavigate()
    
    return (
        <Grid item xs={3}>
            <Box
                sx={{
                    height: "fit-content",
                    backgroundColor: "white",
                    borderRadius: "15px",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    flexDirection: "column",
                    padding: "1vw",
                    gap: "1vw",
                    color: colors.text.greyish,
                    // flex: 1,
                }}
            >
                <Box
                    sx={{
                        alignItems: "center",
                        gap: "1vw",
                    }}
                >
                    <MuiAvatar
                        sx={{
                            backgroundColor: colors.secondary,
                        }}
                    />
                    <Box
                        sx={{
                            flexDirection: "column",
                        }}
                    >
                        <p
                            style={{
                                color: colors.text.darkgrey,
                            }}
                        >
                            {customer.name}
                        </p>
                        <p>Cliente há x dias</p>
                    </Box>
                </Box>
                <Box
                    sx={{
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            gap: "1vw",
                        }}
                    >
                        <p>CPF: {customer.cpf}</p>
                        <p>
                            {customer.city}/{customer.state}
                        </p>
                    </Box>
                    <p>Certificado digital expira em: 00/00/00</p>
                </Box>
                <Box
                    sx={{
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            gap: "0.5vw",
                        }}
                    >
                        <EmailOutlinedIcon />
                        <p>{customer.email}</p>
                    </Box>
                    <Box
                        sx={{
                            gap: "0.5vw",
                        }}
                    >
                        <SettingsPhoneOutlinedIcon />
                        <p>{customer.phone}</p>
                    </Box>
                </Box>
                <Box
                    sx={{
                        justifyContent: "space-between",
                        gap: "3vw",
                    }}
                >
                    <Button
                        color={buttonColor}
                        variant="outlined"
                        sx={{
                            textTransform: "unset",
                            borderRadius: "15px",
                            pointerEvents: "none",
                        }}
                    >
                        Sem pendências
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: "15px",
                            textTransform: "unset",
                            gap: "0.5vw",
                        }}
                        onClick={() => navigate(`/selecionar-empresa/${customer.id}`)}
                    >
                        <LoginOutlinedIcon />
                        <p>Acessar Sistema</p>
                    </Button>
                </Box>
            </Box>
        </Grid>
    )
}