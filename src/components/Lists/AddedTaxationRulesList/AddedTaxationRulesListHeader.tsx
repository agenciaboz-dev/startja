import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"

interface AddedTaxationRulesListHeaderProps {}

export const AddedTaxationRulesListHeader: React.FC<AddedTaxationRulesListHeaderProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const cellStyle = {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    }

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
                    width: isMobile ? "100%" : "100%",
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
                        gap: isMobile ? "10vw" : "",
                    }}
                >
                    <Box
                        sx={{
                            alignItems: "center",
                            width: isMobile ? "30vw" : "10%",
                        }}
                    >
                        <h3>Origem</h3>
                    </Box>
                    <Box
                        sx={{
                            alignItems: "center",
                            width: isMobile ? "30vw" : "10%",
                        }}
                    >
                        <h3>Destino(s)</h3>
                    </Box>
                    <Box
                        sx={{
                            ...cellStyle,
                            width: isMobile ? "30vw" : "10%",
                        }}
                    >
                        <h3>NCM</h3>
                    </Box>
                    <Box
                        sx={{
                            ...cellStyle,
                            width: isMobile ? "30vw" : "25%",
                        }}
                    >
                        <h3>Produto(s)</h3>
                    </Box>
                    <Box
                        sx={{
                            ...cellStyle,
                            width: isMobile ? "30vw" : "10%",
                        }}
                    >
                        <h3>CFOP</h3>
                    </Box>
                    <Box
                        sx={{
                            ...cellStyle,
                            width: isMobile ? "30vw" : "10%",
                        }}
                    >
                        <h3>Situação tributária do ICMS</h3>
                    </Box>
                    <Box
                        sx={{
                            ...cellStyle,
                            width: isMobile ? "30vw" : "10%",
                        }}
                    >
                        <h3>Situação tributária do PIS</h3>
                    </Box>
                    <Box
                        sx={{
                            ...cellStyle,
                            width: isMobile ? "30vw" : "10%",
                        }}
                    >
                        <h3>Situação tributária do COFINS</h3>
                    </Box>
                    <Box
                        sx={{
                            ...cellStyle,
                            justifyContent: "right",
                            width: isMobile ? "30vw" : "5%",
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