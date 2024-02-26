import React from 'react'
import {Box, Button, Grid, TextField, useMediaQuery} from '@mui/material'
import { PermissionsCard } from '../../PermissionsCard'

interface PermissionsContainerProps {
    
}

export const PermissionsContainer:React.FC<PermissionsContainerProps> = ({  }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')
    return (
        <Box
                            sx={{
                                flex: 1,
                                flexDirection: "column",
                                gap: isMobile ? "5vw" : "1vw"
                            }}>
                            <Box
                                sx={{
                                    justifyContent: "space-between",
                                    alignItems: isMobile ? "start" : "center",
                                    flexDirection: isMobile ? "column" : "",
                                    gap: isMobile ? "4vw" : ""
                                }}>
                                <h3>Permissões</h3>
                                <Box
                                    sx={{
                                        alignItems: "center",
                                        gap: isMobile ? "4vw" : "1vw",
                                        flexDirection: isMobile ? "column-reverse" : "",
                                        width: isMobile ? "100%" : "fit-content"
                                    }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        sx={{
                                            color: "white",
                                            borderRadius: "20px",
                                            textTransform: "unset"
                                        }}>
                                        Salvar Predefinição
                                    </Button>
                                    <TextField
                                        label="Predefinição"
                                        sx={{
                                            width: isMobile ? "100%" : "10vw"
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    flexDirection: "column",
                                    gap: isMobile ? "5vw" : "1vw",
                                    marginTop: isMobile ? "5vw" : "1vw"
                                }}>
                                <h3>Responsável pelo Uso</h3>
                                <p>
                                    O "Responsável pelo uso" é o representante legal da conta StartJá, com acesso total, podendo adicionar, editar e
                                    remover acessos e configurações.
                                </p>
                                <p>O Administrador responsável será o responsável legal por padrão, mas você pode atribuir ao seu cliente.</p>
                            </Box>

                            {/* <FormControlLabel control={<ToggleSwitch />} label="Atribuir cliente como responsável" /> */}

                            <Grid container spacing={2}>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField label="E-mail do Responsável" fullWidth />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField label="Telefone do Responsável" fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Nome do Responsável" fullWidth />
                                </Grid>
                            </Grid>

                            <Box
                                sx={{
                                    flexDirection: "column",
                                    gap: isMobile ? "4vw" : "2vw",
                                    marginTop: isMobile ? "5vw" : "2vw"
                                }}>
                                <PermissionsCard header="Visão Geral" />
                                <PermissionsCard header="Emissão de Nota Fiscal" />
                                <PermissionsCard header="Cadastros Gerais" />
                                <PermissionsCard header="Relatórios" />
                                {/* <PermissionsCard header="Livro Caixa" /> */}
                            </Box>
                        </Box>
    )
}