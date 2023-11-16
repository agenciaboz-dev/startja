import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid, Tabs, Tab } from "@mui/material"
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
                    borderRadius: "30px",
                    paddingTop: "1rem",
                    minWidth: "60vw",
                    width: "fit-content",
                },
            }}
        >
            <DialogTitle>Adicionar nova conta</DialogTitle>
            <CloseOutlinedIcon
                sx={{
                    position: "absolute",
                    top: "2rem",
                    right: "1rem",
                    cursor: "pointer",
                }}
                onClick={onClose}
            />

            <DialogContent>
                <Box
                    sx={{
                        flexDirection: "column",
                        width: "100%",
                        gap: "2rem",
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
                            <Grid item xs={4}>
                                <TextField label="Banco" fullWidth />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField label="Agência" fullWidth />
                            </Grid>
                            <Grid item xs={4}>
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
                    margin: "0.5rem",
                }}
            >
                <Button
                    onClick={onClose}
                    color="secondary"
                    variant="contained"
                    sx={{
                        borderRadius: "30px",
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
                        borderRadius: "30px",
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
