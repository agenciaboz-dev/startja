import React, { useEffect } from "react"
import { Avatar, Box, Button, Grid, TextField } from "@mui/material"
import { useHeader } from "../../../../../../hooks/useHeader"
import { useLocation, useNavigate } from "react-router-dom"
import { colors } from "../../../../../../style/colors"

interface ConfigMyAccountProps {
    user: User
}

export const ConfigMyAccount: React.FC<ConfigMyAccountProps> = ({ user }) => {
    const header = useHeader()
    const pathname = useLocation().pathname
    const navigate = useNavigate()

    useEffect(() => {
        if (pathname.split("/painel").length < 3) {
            navigate("/painel/configuracoes/minha-conta")
        }
        header.setTitle("Configurações")
    }, [])

    return (
        <>
            <Box
                sx={{
                    flex: 1,
                    padding: "1.5vw",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    backgroundColor: "white",
                    borderRadius: "30px",
                    flexDirection: "column",
                    width: "100%",
                    gap: "1vw",
                }}
            >
                <Box
                    sx={{
                        justifyContent: "space-between",
                    }}
                >
                    <h2>Minha Conta</h2>
                    <Button variant="contained" sx={{ borderRadius: "30px", textTransform: "unset" }}>
                        Salvar informações
                    </Button>
                </Box>
                <Box
                    sx={{
                        height: "100%",
                        gap: "1.5vw",
                    }}
                >
                    <Box
                        sx={{
                            flexDirection: "column",
                            flex: 1,
                            justifyContent: "space-between",
                            height: "100%",
                            gap: "1vw",
                        }}
                    >
                        <Box
                            sx={{
                                alignItems: "center",
                                gap: "1vw",
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: "10vw",
                                    height: "10vw",
                                }}
                            />
                            <Box
                                sx={{
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    gap: "2vw",
                                }}
                            >
                                <Box
                                    sx={{
                                        flexDirection: "column",
                                    }}
                                >
                                    <h3>Logo da empresa</h3>
                                    <p>Adicione sua logo</p>
                                </Box>
                                <p>Utilize imagens no formato .jpg, .png ou .jpeg comtamanho recomendado de 300x160 pixels.</p>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        borderRadius: "30px",
                                        textTransform: "unset",
                                    }}
                                >
                                    Enviar imagem
                                </Button>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: "0.5vw",
                            }}
                        >
                            <p>Dados da empresa</p>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField label="CNPJ" fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Razão social" fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Nome fantasia" fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="E-mail para recebimento de boletos" fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Telefone da empresa" fullWidth />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: "0.5vw",
                            }}
                        >
                            <p>Dados da empresa</p>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField label="CNPJ" fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Razão social" fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Nome fantasia" fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="E-mail para recebimento de boletos" fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Telefone da empresa" fullWidth />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            flexDirection: "column",
                            flex: 1,
                            justifyContent: "space-between",
                            height: "100%",
                            gap: "1vw",
                        }}
                    >
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: "0.5vw",
                            }}
                        >
                            <p>Endereço</p>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
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
                                    <TextField label="Bairro" fullWidth />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                flexDirection: "column",
                                flex: 1,
                                gap: "1vw",
                            }}
                        >
                            <p>Meu plano</p>
                            <Box
                                sx={{
                                    height: "100%",
                                    gap: "0.5vw",
                                }}
                            >
                                <Box
                                    sx={{
                                        flexDirection: "column",
                                        flex: 1,
                                        gap: "0.5vw",
                                        width: "50%",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <p>Valor total</p>
                                        <p style={{ display: "flex", alignItems: "center" }}>
                                            R$ <span style={{ fontSize: "3rem", margin: "0 0.5rem" }}>0,00</span> /ano
                                        </p>
                                    </Box>
                                    <Box
                                        sx={{
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <p>Plano completo</p>
                                        <p>R$0,00</p>
                                    </Box>
                                    <hr />
                                    {/* <Box
                                        sx={{
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <p>Livro-caixa</p>
                                        <p>R$0,00</p>
                                    </Box>
                                    <hr /> */}
                                    <Box
                                        sx={{
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <p>Nota fiscal eletrônica</p>
                                        <p>R$0,00</p>
                                    </Box>
                                    <hr />
                                    <Box
                                        sx={{
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <p>Simulador do imposto de renda</p>
                                        <p>R$0,00</p>
                                    </Box>
                                    <hr />
                                </Box>
                                <Box
                                    sx={{
                                        flexDirection: "column",
                                        flex: 1,
                                        gap: "0.5vw",
                                        width: "50%",
                                        backgroundColor: colors.background,
                                        boxShadow: "0 2px 2px 2px #d1d1d1",

                                        borderRadius: "30px",
                                        justifyContent: "space-between",
                                        padding: "1vw",
                                    }}
                                >
                                    <p>Lorem Ipsum</p>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
