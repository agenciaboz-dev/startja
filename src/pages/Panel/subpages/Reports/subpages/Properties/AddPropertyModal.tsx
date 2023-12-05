import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { PropertiesListHeader } from "../../../../../../components/PropertiesList/PropertiesListHeader"
import { PropertiesList } from "../../../../../../components/PropertiesList"
import { AddedTaxationRulesListHeader } from "../../../../../../components/AddedTaxationRulesList/AddedTaxationRulesListHeader"
import { AddedTaxationRuleRowsList } from "../../../../../../components/AddedTaxationRulesList"

interface AddPropertyModalProps {
    open: boolean
    onClose: () => void
}

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({ open, onClose }) => {
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
                    paddingTop: "1vw",
                    minWidth: "60vw",
                    width: "fit-content",
                },
            }}
        >
            <DialogTitle>Adicionar propriedade</DialogTitle>
            <CloseOutlinedIcon
                sx={{
                    position: "absolute",
                    top: "2vw",
                    right: "1vw",
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
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Nome da propriedade" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="IE vinculada à propriedade" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="NIRF(CAFIR)" fullWidth />
                        </Grid>
                    </Grid>

                    <h4>Endereço da propriedade</h4>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField label="CEP" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Cidade/UF" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Rua" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Número" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Complemento" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Bairro" fullWidth />
                        </Grid>
                    </Grid>

                    <h4>Exploração</h4>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Tipo de exploração" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Produtor rural declarante" fullWidth />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    margin: "0.5vw",
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
                    Cadastrar propriedade
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddPropertyModal
