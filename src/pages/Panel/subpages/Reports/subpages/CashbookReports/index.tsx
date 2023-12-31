import React, { useEffect, useState } from "react"
import { Box, Button, Grid, TextField, useMediaQuery } from "@mui/material"
import { useHeader } from "../../../../../../hooks/useHeader"
import { useLocation, useNavigate } from "react-router-dom"

interface CashbookReportsProps {}

export const CashbookReports: React.FC<CashbookReportsProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const header = useHeader()
    const pathname = useLocation().pathname
    const navigate = useNavigate()

    useEffect(() => {
        header.setTitle("Relatórios - Livro-caixa")
    }, [])

    const [emptyList, setEmptyList] = useState(true)

    const handleSearch = (text: string) => {}

    return (
        <Box
            sx={{
                flexDirection: "column",
                flex: 1,
                gap: isMobile ? "5vw" : "1vw",
            }}
        >
            <Box
                sx={{
                    padding: isMobile ? "5vw" : "1.5vw",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    flexDirection: "column",
                    width: "100%",
                    gap: isMobile ? "5vw" : "1vw",
                }}
            >
                <Box
                    sx={{
                        justifyContent: "space-between",
                    }}
                >
                    <h2>Filtros</h2>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            textTransform: "unset",
                        }}
                    >
                        Gerar relatório
                    </Button>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={isMobile ? 12 : 6}>
                        <TextField label="Período" select fullWidth></TextField>
                    </Grid>
                    <Grid item xs={isMobile ? 12 : 6}>
                        <TextField label="Tipo de relatório" select fullWidth></TextField>
                    </Grid>
                    <Grid item xs={isMobile ? 12 : 4}>
                        <TextField label="Cliente/fornecedor" select fullWidth></TextField>
                    </Grid>
                    <Grid item xs={isMobile ? 12 : 4}>
                        <TextField label="Conta (Plano de contas)" select fullWidth></TextField>
                    </Grid>
                    <Grid item xs={isMobile ? 12 : 4}>
                        <TextField label="Conta bancária" select fullWidth></TextField>
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    padding: isMobile ? "5vw" : "1.5vw",

                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                {emptyList && (
                    <Box
                        sx={{
                            flexDirection: "column",
                            alignItems: "center",
                            margin: "auto",
                            gap: isMobile ? "5vw" : "1vw",
                        }}
                    >
                        <h2>Sem resultados</h2>
                        <p>Utilize os filtros acima e clique em gerar relatório para buscar os resultados.</p>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
