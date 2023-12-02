import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Grid, TextField, FormControlLabel, Checkbox } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { ToggleSwitch } from "../../../../components/ToggleSwitch";
import { PermissionsCard } from "../../../../components/PermissionsCard";

interface AddCustomerModalProps {
    open: boolean
    onClose: () => void
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ open, onClose }) => {
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
            <DialogTitle>Novo Cliente</DialogTitle>
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
                        width: "100%",
                        gap: "2vw",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            flexDirection: "column",
                            gap: "1vw",
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label="CPF/CNPJ" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Nome" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Regime tributário" placeholder="Selecione um" fullWidth />
                            </Grid>
                        </Grid>

                        <h3>Contato</h3>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label="E-mail" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Telefone" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Inscrição estadual" placeholder="Selecione um" fullWidth />
                            </Grid>
                        </Grid>

                        <FormControlLabel control={<Checkbox />} label="Não contribuinte / isento" />

                        <h3>Endereço</h3>

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
                    </Box>

                    <hr
                        style={{
                            height: "100%",
                        }}
                    />

                    <Box
                        sx={{
                            flex: 1,
                            flexDirection: "column",
                            gap: "1vw",
                        }}
                    >
                        <Box
                            sx={{
                                justifyContent: "space-around",
                            }}
                        >
                            <h3>Permissões</h3>
                            <Box>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{
                                        color: "white",
                                        borderRadius: "30px",
                                        textTransform: "unset",
                                    }}
                                >
                                    Salvar Predefinição
                                </Button>
                                <TextField
                                    label="Predefinição"
                                    sx={{
                                        width: "10vw",
                                    }}
                                />
                            </Box>
                        </Box>

                        <h4>Responsável pelo Uso</h4>
                        <p>
                            O "Responsável pelo uso" é o representante legal da conta StartJá, com acesso total, podendo adicionar editar e remover
                            acessos e configurações.
                        </p>
                        <p>O Administrador responsável será o responsável legal por padrão, mas você pode atribuir ao seu cliente</p>

                        <FormControlLabel control={<ToggleSwitch />} label="Atribuir cliente como responsável" />

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label="E-mail do Responsável" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Telefone do Responsável" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Nome do Responsável" fullWidth />
                            </Grid>
                        </Grid>

                        <PermissionsCard header="Visão Geral" />
                        <PermissionsCard header="Emissão de Nota Fiscal" />
                        <PermissionsCard header="Cadastros Gerais" />
                        <PermissionsCard header="Relatórios" />
                        {/* <PermissionsCard header="Livro Caixa" /> */}
                    </Box>
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
                    Adicionar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddCustomerModal
