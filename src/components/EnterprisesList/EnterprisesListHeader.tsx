import React from "react"
import { Box, Checkbox } from "@mui/material"

interface EnterprisesListHeaderProps {}

export const EnterprisesListHeader: React.FC<EnterprisesListHeaderProps> = ({}) => {
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
                        gap: "2rem",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >
                        <h3>Nome</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >
                        <h3>CPF / CNPJ</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >
                        <h3>Tipo</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >
                        <h3>Cidade / UF</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >
                        <h3>Fone</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >
                        <h3>Ações</h3>
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
