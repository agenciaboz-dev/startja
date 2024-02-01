import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid, Tabs, Tab, useMediaQuery, Radio } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { tabStyles } from "../../../style/tabStyles"

interface AddAccountModalProps {
    open: boolean
    onClose: () => void
}

const AddAccountModal: React.FC<AddAccountModalProps> = ({ open, onClose }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const [accountFormDisplay, setAccountFormDisplay] = useState("bank")

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
                        <Tabs
                            variant="fullWidth"
                            textColor="primary"
                            indicatorColor="primary"
                            sx={{ width: "100%" }}
                            onChange={(_, value) => setAccountFormDisplay(value)}
                            value={accountFormDisplay}
                        >
                            <Tab
                                value={"bank"}
                                label={
                                    <Box sx={tabStyles.label}>
                                        {!isMobile && <Radio checked={accountFormDisplay === "bank"} />}
                                        <p>Conta bancária</p>
                                    </Box>
                                }
                                // onClick={() => setAccountType("bank")}
                                sx={accountFormDisplay === "bank" ? tabStyles.active : tabStyles.inactive}
                            />
                            <Tab
                                value={"internal"}
                                label={
                                    <Box sx={tabStyles.label}>
                                        {!isMobile && <Radio checked={accountFormDisplay === "internal"} />}
                                        <p>Caixa interno</p>
                                    </Box>
                                }
                                // onClick={() => setAccountType("internal")}
                                sx={accountFormDisplay === "internal" ? tabStyles.active : tabStyles.inactive}
                            />
                        </Tabs>
                    </Box>

                    {accountFormDisplay === "bank" && (
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

                    {accountFormDisplay === "internal" && (
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
                    margin: isMobile ? "0" : "0.5vw",
                    padding: isMobile ? "5vw" : "",
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
