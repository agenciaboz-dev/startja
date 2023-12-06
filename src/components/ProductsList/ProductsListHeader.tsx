import React from "react"
import { Box, Checkbox } from "@mui/material"

interface ProductsListHeaderProps {}

export const ProductsListHeader: React.FC<ProductsListHeaderProps> = ({}) => {

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
                        flex: 1,
                    }}
                >
                    <Box
                        sx={{
                            width: "45%",
                        }}
                    >
                        <h3>Nome do Produto</h3>
                    </Box>
                    <Box
                        sx={{
                            width: "45%",
                        }}
                    >
                        <h3>NCM - Classificação</h3>
                    </Box>
                    <Box
                        sx={{
                            width: "5%",
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