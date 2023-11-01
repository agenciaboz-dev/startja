import React from "react"
import { Box, Checkbox } from "@mui/material"

interface InvoicesListHeaderProps {}

export const InvoicesListHeader: React.FC<InvoicesListHeaderProps> = ({}) => {

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
                    marginBottom: "1rem"
                }}
                >
                <Checkbox
                    inputProps={{
                        style: {
                            padding: "0"
                        }
                    }}
                />
                <Box
                    sx={{
                        justifyContent: "space-between",
                        flex: 1,
                        gap: "2rem"
                    }}
                >

                    <Box
                    sx={{
                        flex: 1
                    }}
                    >
                        <h3>Emissão</h3>
                    </Box>
                    <Box
                    sx={{
                        flex: 1
                    }}
                    >
                        <h3>Série/Nº NFe</h3>
                    </Box>
                    <Box
                    sx={{
                        flex: 1
                    }}
                    >
                        <h3>Cliente/Fornecedor</h3>
                    </Box>
                    <Box
                    sx={{
                        flex: 1
                    }}
                    >
                        <h3>Emitente</h3>
                    </Box>
                    <Box
                    sx={{
                        flex: 1
                    }}
                    >
                        <h3>Propriedade</h3>
                    </Box>
                    <Box
                    sx={{
                        flex: 1
                    }}
                    >
                        <h3>Valor</h3>
                    </Box>
                    <Box
                    sx={{
                        flex: 1
                    }}
                    >
                        <h3>Situação</h3>
                    </Box>
                    <Box
                    sx={{
                        flex: 1,
                        justifyContent: "end"
                    }}
                    >
                        <h3>Ações</h3>
                    </Box>

                </Box>
            </Box>
            <hr
                style={{
                    marginLeft: "1rem",
                    width: "100%"
                }}
            />
        </Box>
    )
}