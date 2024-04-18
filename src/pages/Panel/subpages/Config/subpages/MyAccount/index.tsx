import React, { useEffect, useState } from "react"
import { Avatar, Box, Button, CircularProgress, Grid, TextField, useMediaQuery } from "@mui/material"
import { useHeader } from "../../../../../../hooks/useHeader"
import { useLocation, useNavigate } from "react-router-dom"
import { colors } from "../../../../../../style/colors"
import { useFormik } from "formik"
import { useIo } from "../../../../../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import MaskedInput from "../../../../../../components/MaskedInput"

interface ConfigMyAccountProps {
    user: User
}

export const ConfigMyAccount: React.FC<ConfigMyAccountProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const header = useHeader()
    const pathname = useLocation().pathname
    const navigate = useNavigate()
    const io = useIo()

    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)

    const formik = useFormik<Partial<User>>({
        initialValues: {
            document: user.document,
            name: user.name,
            businessName: user.businessName,
            email: user.email,
            phone: user.phone,
            cep: user.cep,
            city: user.city,
            street: user.street,
            number: user.number,
            district: user.district,
        },
        onSubmit(values) {
            setLoading(true)
            io.emit("user:update", user.id, { ...values, cep: values.cep?.replace(/\D/g, "") })
        },
        enableReinitialize: true,
    })

    useEffect(() => {
        if (pathname.split("/painel").length < 3) {
            navigate("/painel/configuracoes/minha-conta")
        }
        header.setTitle("Configurações")

        io.on("user:update:success", () => {
            setLoading(false)
            snackbar({ severity: "success", text: "usuário atualizado" })
        })

        io.on("user:update:error", (error) => {
            setLoading(false)
            snackbar({ severity: "error", text: error })
        })

        return () => {
            io.off("user:update:success")
            io.off("user:update:error")
        }
    }, [])

    return (
        <Box
            sx={{
                flex: 1,
                padding: isMobile ? "5vw" : "1.5vw",
                boxShadow: "0 2px 2px 2px #d1d1d1",
                backgroundColor: "white",
                borderRadius: "20px",
                flexDirection: "column",
                width: "100%",
                gap: isMobile ? "5vw" : "1vw",
            }}
        >
            <form onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        justifyContent: "space-between",
                    }}
                >
                    <h2>Minha Conta</h2>
                    <Button variant="contained" sx={{ borderRadius: "20px", textTransform: "unset" }} type="submit">
                        {loading ? <CircularProgress size="1.5rem" sx={{ color: "white" }} /> : "Salvar informações"}
                    </Button>
                </Box>
                <Box
                    sx={{
                        height: "100%",
                        gap: isMobile ? "5vw" : "1.5vw",
                        flexDirection: isMobile ? "column" : "row",
                    }}
                >
                    <Box
                        sx={{
                            flexDirection: "column",
                            flex: 1,
                            justifyContent: "space-between",
                            height: "100%",
                            gap: isMobile ? "5vw" : "1vw",
                        }}
                    >
                        <Box
                            sx={{
                                alignItems: "center",
                                gap: isMobile ? "5vw" : "1vw",
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
                                    gap: isMobile ? "5vw" : "2vw",
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
                                        borderRadius: "20px",
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
                                gap: isMobile ? "5vw" : "0.5vw",
                            }}
                        >
                            <p>Dados da empresa</p>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField label="CNPJ" fullWidth name="document" value={formik.values.document} onChange={formik.handleChange} />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField label="Razão social" fullWidth name="name" value={formik.values.name} onChange={formik.handleChange} />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField
                                        label="Nome fantasia"
                                        fullWidth
                                        name="businessName"
                                        value={formik.values.businessName}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField
                                        label="E-mail para recebimento de boletos"
                                        fullWidth
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField
                                        label="Telefone da empresa"
                                        fullWidth
                                        name="phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: isMobile ? "5vw" : "0.5vw",
                            }}
                        >
                            <p>Dados do responsável</p>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField label="Nome do responsável" fullWidth />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField label="E-mail do responsável" fullWidth />
                                </Grid>
                                <Grid item xs={isMobile ? 12 : 6}>
                                    <TextField label="Telefone do responsável" fullWidth />
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
                            gap: isMobile ? "5vw" : "1vw",
                        }}
                    >
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: isMobile ? "5vw" : "0.5vw",
                            }}
                        >
                            <p>Endereço</p>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="CEP"
                                        fullWidth
                                        name="cep"
                                        value={formik.values.cep}
                                        onChange={formik.handleChange}
                                        InputProps={{
                                            inputComponent: MaskedInput,
                                            inputProps: { mask: [/\d/, /\d/, /\d/, ".", /\d/, /\d/, "-", /\d/, /\d/, /\d/] },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Cidade/UF" fullWidth name="city" value={formik.values.city} onChange={formik.handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Rua" fullWidth name="street" value={formik.values.street} onChange={formik.handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Número" fullWidth name="number" value={formik.values.number} onChange={formik.handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Bairro"
                                        fullWidth
                                        name="district"
                                        value={formik.values.district}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                flexDirection: "column",
                                flex: 1,
                                gap: isMobile ? "5vw" : "1vw",
                            }}
                        >
                            <p>Meu plano</p>
                            <Box
                                sx={{
                                    height: "100%",
                                    gap: isMobile ? "5vw" : "0.5vw",
                                    flexDirection: isMobile ? "column" : "",
                                }}
                            >
                                <Box
                                    sx={{
                                        flexDirection: "column",
                                        flex: 1,
                                        gap: isMobile ? "5vw" : "0.5vw",
                                        width: isMobile ? "100%" : "50%",
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
                                        gap: isMobile ? "5vw" : "0.5vw",
                                        width: isMobile ? "100%" : "50%",
                                        backgroundColor: colors.background,
                                        boxShadow: "0 2px 2px 2px #d1d1d1",

                                        borderRadius: "20px",
                                        justifyContent: "space-between",
                                        padding: isMobile ? "5vw" : "1vw",
                                    }}
                                >
                                    <p>Lorem Ipsum</p>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}
