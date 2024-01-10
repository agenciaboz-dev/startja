import React from "react"
import { AlertColor, Box, Button, Grid, Avatar as MuiAvatar, useMediaQuery } from "@mui/material"
import { colors } from "../../style/colors"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import SettingsPhoneOutlinedIcon from "@mui/icons-material/SettingsPhoneOutlined"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"

interface CustomerCardProps {
    customer: User
    buttonColor: AlertColor | "primary" | "secondary"
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer, buttonColor }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const { setUser } = useUser()
    console.log(customer)

    const userClick = () => {
        setUser(customer)
        navigate("/painel")
    }

    return (
        <Grid item xs={isMobile ? 12 : 3}>
            <Box
                sx={{
                    height: "fit-content",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    flexDirection: "column",
                    padding: isMobile ? "5vw" : "1vw",
                    gap: isMobile ? "5vw" : "1vw",
                    color: colors.text.greyish
                    // flex: 1,
                }}>
                <Box
                    sx={{
                        alignItems: "center",
                        gap: "1vw"
                    }}>
                    <MuiAvatar
                        sx={{
                            backgroundColor: colors.secondary
                        }}
                    />
                    <Box
                        sx={{
                            flexDirection: "column"
                        }}>
                        <p
                            style={{
                                color: colors.text.darkgrey
                            }}>
                            {customer.name}
                        </p>
                        <p>Cliente há x dias</p>
                    </Box>
                </Box>
                <Box
                    sx={{
                        flexDirection: "column"
                    }}>
                    <Box
                        sx={{
                            gap: "1vw"
                        }}>
                        <p>CPF: {customer.document}</p>
                        <p>
                            {customer.city}/{customer.state}
                        </p>
                    </Box>
                    <p>Certificado digital expira em: {new Date(Number(customer.certificate.expiry)).toLocaleDateString("pt-br")}</p>
                </Box>
                <Box
                    sx={{
                        flexDirection: "column"
                    }}>
                    <Box
                        sx={{
                            gap: "0.5vw"
                        }}>
                        <EmailOutlinedIcon />
                        <p>{customer.email}</p>
                    </Box>
                    <Box
                        sx={{
                            gap: "0.5vw"
                        }}>
                        <SettingsPhoneOutlinedIcon />
                        <p>{customer.phone}</p>
                    </Box>
                </Box>
                <Box
                    sx={{
                        justifyContent: "space-between",
                        gap: "3vw"
                    }}>
                    <Button
                        color={buttonColor}
                        variant="outlined"
                        sx={{
                            textTransform: "unset",
                            borderRadius: "20px",
                            pointerEvents: "none"
                        }}>
                        Sem pendências
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            textTransform: "unset",
                            gap: "0.5vw"
                        }}
                        onClick={userClick}>
                        <LoginOutlinedIcon />
                        <p>Acessar Sistema</p>
                    </Button>
                </Box>
            </Box>
        </Grid>
    )
}
