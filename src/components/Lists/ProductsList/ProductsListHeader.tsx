import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"

interface ProductsListHeaderProps {}

export const ProductsListHeader: React.FC<ProductsListHeaderProps> = ({}) => {
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
                            flex: 0.35,
                        }}
                    >
                        {!isMobile && <h3>Nome do Produto</h3>}
                        {isMobile && <h3>Produto</h3>}
                    </Box>
                    <Box
                        sx={{
                            flex: 0.35,
                        }}
                    >
                        <h3>NCM - Classificação</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 0.25,
                        }}
                    >
                        <h3>Código de Origem do ICMS</h3>
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