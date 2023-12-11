import React from "react"
import { Box, Button, IconButton, Paper, useMediaQuery } from "@mui/material"
import { SectionTitle } from "../../../../components/SectionTitle"
import { useArray } from "burgos-array"
import { AddOutlined, BookOutlined, CancelOutlined } from "@mui/icons-material"

interface FiscalMonitorProps {
    company: Company
}

const DocumentComponent: React.FC<{ document?: any }> = ({ document }) => {
    return (
        <Box sx={{ width: "100%", gap: "1vw", justifyContent: "space-between" }}>
            <Box sx={{ flexDirection: "column", maxWidth: "70%", color: "#555" }}>
                <p style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    FACILISI HENDREIT FAUCIBUS SAGITIRIS CACILDIS DE BEKS
                </p>
                <Box sx={{ flex: 1, justifyContent: "space-between", color: "secondary.main" }}>
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
    const isMobile = useMediaQuery("(orientation: portrait)")
    const quantity = "x"

    const documents = useArray().newArray(10)

    return (
        <Box sx={{ gap: isMobile ? "5vw" : "1vw", flexDirection: "column", width: isMobile ? "90vw" : "fit-content" }}>
            <Box sx={{ alignItems: "center", gap: isMobile ? "5vw" : "2vw" }}>
                <SectionTitle>Seu Monitor Fiscal</SectionTitle>
                <Button
                    variant="text"
                    sx={{
                        borderRadius: "20px",
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
                    borderRadius: "20px",
                    flex: 1,
                    flexDirection: "column",
                    padding: isMobile ? "5vw" : "2vw",
                    gap: isMobile ? "5vw" : "2vw",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        flexDirection: "column",
                        maxWidth: "80vw",
                        height: isMobile ? "80%" : "",
                    }}
                >
                    Há {quantity} documentos restantes
                    {documents.map((document) => (
                        <DocumentComponent key={document} />
                    ))}
                </Box>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: "20px",
                        textTransform: "none",
                        position: "absolute",
                        bottom: isMobile ? "5vw" : "1vw",
                        right: isMobile ? "5vw" : "1vw",
                        gap: "0.5vw",
                    }}
                >
                    <AddOutlined />
                    Adicionar novo cliente
                </Button>
            </Paper>
        </Box>
    )
}
