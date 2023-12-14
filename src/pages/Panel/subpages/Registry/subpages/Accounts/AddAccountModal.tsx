import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid, Tabs, Tab, useMediaQuery } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
// import { AccountsListHeader } from "../../../../components/AccountsList/AccountsListHeader"
// import { AccountsList } from "../../../../components/AccountsList"
import { AddedTaxationRulesListHeader } from "../../../../../../components/AddedTaxationRulesList/AddedTaxationRulesListHeader"
import { AddedTaxationRuleRowsList } from "../../../../../../components/AddedTaxationRulesList"

interface AddAccountModalProps {
    open: boolean
    onClose: () => void
}

const AddAccountModal: React.FC<AddAccountModalProps> = ({ open, onClose }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [accountType, setAccountType] = useState("bank")

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                justifyContent: "center",
            }}
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    minWidth: "90vw",
                    width: "fit-content",
                    minHeight: isMobile ? "60vh" : "",
                },
            }}
        >
            <DialogTitle>Adicionar nova conta</DialogTitle>
            <CloseOutlinedIcon
                sx={{
                    position: "absolute",
                    top: isMobile ? "5vw" : "1vw",
                    right: isMobile ? "5vw" : "1vw",
                    cursor: "pointer",
                }}
                onClick={onClose}
            />

            <DialogContent>
                <Box
                    sx={{
                        flexDirection: "column",
                        width: "100%",
                        gap: "2vw",
                    }}
                >
                    <Box>
                        <Tabs variant="scrollable" indicatorColor="primary">
                            <Tab label="Conta bancária" onClick={() => setAccountType("bank")} sx={{ textTransform: "unset" }} />
                            <Tab label="Caixa interno" onClick={() => setAccountType("internal")} sx={{ textTransform: "unset" }} />
                        </Tabs>
                    </Box>

                    {accountType === "bank" && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField label="Nome da conta" fullWidth />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 4}>
                                <TextField label="Banco" fullWidth />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 4}>
                                <TextField label="Agência" fullWidth />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 4}>
                                <TextField label="Número da conta" fullWidth />
                            </Grid>
                        </Grid>
                    )}

                    {accountType === "internal" && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField label="Nome da conta" fullWidth />
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    padding: isMobile ? "5vw" : "0.5vw",
                }}
            >
                <Button
                    onClick={onClose}
                    color="secondary"
                    variant="contained"
                    sx={{
                        borderRadius: "20px",
                        color: "white",
                        textTransform: "unset",
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={onClose}
                    color="primary"
                    variant="contained"
                    sx={{
                        borderRadius: "20px",
                        color: "white",
                        textTransform: "unset",
                    }}
                >
                    Cadastrar conta
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddAccountModal
