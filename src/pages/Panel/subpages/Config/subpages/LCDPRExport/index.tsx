import React, { useEffect } from "react"
import { Box, Button, useMediaQuery } from "@mui/material"
import { useHeader } from "../../../../../../hooks/useHeader"

interface ConfigLCDPRExportProps {
    user: User
}

export const ConfigLCDPRExport: React.FC<ConfigLCDPRExportProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const header = useHeader()
    useEffect(() => {
        header.setTitle("Configurações")
    }, [])

    return (
        <Box
            sx={{
                flexDirection: "column",
                height: "100%",
                width: "100%",
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
                    gap: isMobile ? "5vw" : "0.5vw",
                }}
            >
                <Box
                    sx={{
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <h2>Exportar LCDPR</h2>
                    <Button variant="contained" sx={{ borderRadius: "20px", textTransform: "unset" }}>
                        Salvar informações
                    </Button>
                </Box>
                <p>
                    Para importar cadastros e lançamentos de um LCDPR já gerado, selecione abaixo o arquivo utilizado para importar o LCDPR no sistema
                    da Receita Federal.
                </p>
                <p>Selecione abaixo o arquivo .TXT:</p>
                <Box
                    sx={{
                        border: "2px dashed grey",
                        justifyContent: "center",
                        alignContent: "center",
                        padding: "5vw",
                        margin: isMobile ? "" : "1vw 0",
                    }}
                >
                    Arraste os arquivos aqui ou clique para selecionar.
                </Box>
                <p>Limite de um arquivo, máximo 1 MB</p>
            </Box>
        </Box>
    )
}
