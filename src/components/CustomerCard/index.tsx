import React, { useState } from "react"
import { AlertColor, Box, Button, Grid, IconButton, Menu, MenuItem, Avatar as MuiAvatar, useMediaQuery } from "@mui/material"
import { colors } from "../../style/colors"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import SettingsPhoneOutlinedIcon from "@mui/icons-material/SettingsPhoneOutlined"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { Edit } from "@mui/icons-material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import UpdateCustomerModal from "../Modals/UpdateCustomerModal copy"

interface CustomerCardProps {
    customer: User
    buttonColor: AlertColor | "primary" | "secondary"
    openCustomerModal?: () => void
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer, buttonColor, openCustomerModal }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const { setUser } = useUser()

    const userClick = () => {
        setUser(customer)
        navigate("/painel")
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const [updateCustomerModalOpen, setUpdateCustomerModalOpen] = useState(false)
    const openUpdateCustomerModal = () => {
        setUpdateCustomerModalOpen(true)
    }
    const calculateDays = (registerDate: number): number => {
        const registerDateObj = new Date(registerDate)
        const currentDate = new Date()
        const timeDiff = currentDate.getTime() - registerDateObj.getTime()
        return Math.floor(timeDiff / (1000 * 60 * 60 * 24))
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
                    color: colors.text.greyish,
                    // flex: 1,
                }}
            >
                <UpdateCustomerModal
                    customer={customer}
                    open={updateCustomerModalOpen}
                    onClose={() => setUpdateCustomerModalOpen(false)}
                />
                <Box
                    sx={{
                        alignItems: "center",
                        gap: "1vw",
                        justifyContent: "space-between",
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
                            <p>Cliente há {calculateDays(Number(customer.register_date))} dias</p>
                        </Box>
                    </Box>
                    <Box>
                        <IconButton
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        >
                            <MoreVertIcon sx={{ color: colors.secondary }} />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleClose()
                                    openUpdateCustomerModal()
                                }}
                            >
                                <Edit sx={{}} />
                                Editar
                            </MenuItem>
                        </Menu>
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
                        <p>CPF: {customer.document}</p>
                        <p>
                            {customer.city}/{customer.state}
                        </p>
                    </Box>
                    <p>
                        Certificado digital expira em:{" "}
                        {new Date(Number(customer.certificate.expiry)).toLocaleDateString("pt-br")}
                    </p>
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
                            borderRadius: "20px",
                            pointerEvents: "none",
                        }}
                    >
                        Sem pendências
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            textTransform: "unset",
                            gap: "0.5vw",
                        }}
                        onClick={userClick}
                    >
                        <LoginOutlinedIcon />
                        <p>Acessar Sistema</p>
                    </Button>
                </Box>
            </Box>
        </Grid>
    )
}
