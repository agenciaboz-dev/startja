import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"

interface NaturesListHeaderProps {}

export const NaturesListHeader: React.FC<NaturesListHeaderProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const cellStyle = { flex: 0.12, justifyContent: "center", textAlign: "center" }
    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "1vw",
                }}
            >
                <Checkbox
                    inputProps={{
                        style: {
                            padding: "0",
                        },
                    }}
                />
                <Box
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        flex: 1,
                        gap: isMobile ? "20vw" : "2vw",
                    }}
                >
                    <Box
                        sx={{
                            flex: 0.4,
                        }}
                    >
                        <h3>Nome</h3>
                    </Box>
                    <Box sx={cellStyle}>
                        <h3>Operação</h3>
                    </Box>
                    <Box sx={cellStyle}>
                        <h3>Tipo</h3>
                    </Box>
                    <Box sx={cellStyle}>
                        <h3>Finalidade</h3>
                    </Box>
                    <Box sx={cellStyle}>
                        <h3>Editar</h3>
                    </Box>
                    <Box sx={cellStyle}>
                        <h3>Ativar / Desativar</h3>
                    </Box>
                </Box>
            </Box>
            <hr
                style={{
                    marginLeft: "1vw",
                    width: "100%",
                }}
            />
        </Box>
    )
}