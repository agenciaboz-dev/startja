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
                        gap: "2vw",
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
                            justifyContent: "center",
                        }}
                    >
                        <h3>CPF / CNPJ</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Tipo</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Cidade / UF</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Fone</h3>
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
