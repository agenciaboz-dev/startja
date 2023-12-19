import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"

interface NaturesListHeaderProps {}

export const NaturesListHeader: React.FC<NaturesListHeaderProps> = ({}) => {
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
                        flex: 1,
                        gap: isMobile ? "20vw" : "2vw",
                    }}
                >
                    <Box
                        sx={{
                            flex: 0.7,
                        }}
                    >
                        <h3>Natureza da Operação</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 0.1,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Tributação</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 0.1,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Editar</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 0.1,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Ativar/Desativar</h3>
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