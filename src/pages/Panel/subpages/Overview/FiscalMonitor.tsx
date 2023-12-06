import React from "react"
import { Box, Button, IconButton, Paper } from "@mui/material"
import { SectionTitle } from "../../../../components/SectionTitle"
import { useArray } from "burgos-array"
import { AddOutlined, BookOutlined, CancelOutlined } from "@mui/icons-material"

interface FiscalMonitorProps {
    company: Company
}

const DocumentComponent: React.FC<{ document?: any }> = ({ document }) => {
    return (
        <Box sx={{ width: "100%", gap: "1vw" }}>
            <Box sx={{ flexDirection: "column", width: "100%", color: "#555" }}>
                <p style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    FACILISI HENDREIT FAUCIBUS SAGITIRIS CACILDIS DE BEKS
                </p>
                <Box sx={{ width: "100%", justifyContent: "space-between", color: "secondary.main" }}>
                    <p style={{ color: "#000" }}>R$ 0,00</p>
                    {new Date().toLocaleDateString("pt-br")}
                </Box>
            </Box>
            <IconButton color="inherit">
                <BookOutlined />
            </IconButton>
            <IconButton color="inherit">
                <CancelOutlined />
            </IconButton>
        </Box>
    )
}

export const FiscalMonitor: React.FC<FiscalMonitorProps> = ({ company }) => {
    const quantity = "x"

    const documents = useArray().newArray(10)

    return (
        <Box sx={{ height: "100%", flex: 0.2 }}>
            <Box sx={{ flex: 1, gap: "1vw", flexDirection: "column" }}>
                <Box sx={{ alignItems: "center", gap: "2vw" }}>
                    <SectionTitle>Seu Monitor Fiscal</SectionTitle>
                    <Button
                        variant="text"
                        sx={{
                            borderRadius: "15px",
                            textTransform: "unset",
                        }}
                    >
                        Ver Documentos
                    </Button>
                </Box>
                <Paper
                    elevation={3}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "15px",
                        flex: 1,
                        flexDirection: "column",
                        padding: "2vw",
                        gap: "2vw",
                        position: "relative",
                    }}
                >
                    Há {quantity} documentos restantes
                    {documents.map((document) => (
                        <DocumentComponent key={document} />
                    ))}
                    <Button
                        variant="contained"
                        sx={{ borderRadius: "15px", textTransform: "none", position: "absolute", bottom: "1vw", right: "1vw", gap: "0.5vw" }}
                    >
                        <AddOutlined />
                        Adicionar novo cliente
                    </Button>
                </Paper>
            </Box>
        </Box>
    )
}
