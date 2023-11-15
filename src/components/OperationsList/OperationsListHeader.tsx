import React from "react"
import { Box, Checkbox } from "@mui/material"

interface NaturesListHeaderProps {}

export const NaturesListHeader: React.FC<NaturesListHeaderProps> = ({}) => {
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
                    <Box
                        sx={{
                            width: "70%",
                        }}
                    >
                        <h3>Natureza da Operação</h3>
                    </Box>
                    <Box
                        sx={{
                            width: "10%",
                            justifyContent: "center",
                        }}
                    >
                        <h3>Tributação</h3>
                    </Box>
                    <Box
                        sx={{
                            width: "10%",
                            justifyContent: "center",
                        }}
                    >
                        <h3>Editar</h3>
                    </Box>
                    <Box
                        sx={{
                            width: "10%",
                            justifyContent: "center",
                        }}
                    >
                        <h3>Ativar/Desativar</h3>
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