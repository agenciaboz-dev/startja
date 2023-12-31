import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"

interface InvoicesListHeaderProps {}

export const InvoicesListHeader: React.FC<InvoicesListHeaderProps> = ({}) => {
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
                    }}
                >
                    <Box
                        sx={{
                            width: "10%",
                        }}
                    >
                        <h3>Emissão</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Série/Nº NFe</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Cliente/Fornecedor</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Valor</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Situação</h3>
                    </Box>
                    <Box
                        sx={{
                            width: "5%",
                            justifyContent: "center",
                            marginLeft: "2vw",
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