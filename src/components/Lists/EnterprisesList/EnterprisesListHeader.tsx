import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"

interface EnterprisesListHeaderProps {}

export const EnterprisesListHeader: React.FC<EnterprisesListHeaderProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
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
                            flex: 0.2,
                        }}
                    >
                        <h3>Nome</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 0.2,
                            justifyContent: "center",
                        }}
                    >
                        <h3>CPF / CNPJ</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 0.2,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Tipo</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 0.2,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Cidade / UF</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 0.15,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Fone</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 0.05,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Ações</h3>
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
