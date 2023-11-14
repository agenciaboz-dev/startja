import React from "react"
import { Box, Checkbox } from "@mui/material"

interface InvoiceModalProductsListHeaderProps {}

export const InvoiceModalProductsListHeader: React.FC<InvoiceModalProductsListHeaderProps> = ({}) => {
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
                    marginBottom: "1rem",
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
                    <Box>
                        <h4>Produto</h4>
                    </Box>
                    <Box>
                        <h4>Quantidade/ Unidade</h4>
                    </Box>
                    <Box>
                        <h4>Valor unitário</h4>
                    </Box>
                    <Box>
                        <h4>Valor desconto</h4>
                    </Box>
                    <Box>
                        <h4>Valor total</h4>
                    </Box>
                    <Box>
                        <h4>Tributação</h4>
                    </Box>
                    <Box>
                        <h4>Ações</h4>
                    </Box>
                </Box>
            </Box>
            <hr
                style={{
                    marginLeft: "1rem",
                    width: "100%",
                }}
            />
        </Box>
    )
}
