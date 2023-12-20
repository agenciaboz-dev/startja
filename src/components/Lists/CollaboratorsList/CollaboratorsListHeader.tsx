import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"

interface CollaboratorsListHeaderProps {}

export const CollaboratorsListHeader: React.FC<CollaboratorsListHeaderProps> = ({}) => {
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
                        gap: isMobile ? "20vw" : "2vw",
                    }}
                >
                    <Box
                        sx={{
                            width: "35%",
                        }}
                    >
                        <h3>Usuário</h3>
                    </Box>
                    <Box
                        sx={{
                            width: "25%",
                            justifyContent: "center",
                        }}
                    >
                        <h3>E-mail</h3>
                    </Box>
                    <Box
                        sx={{
                            width: "20%",
                            justifyContent: "center",
                        }}
                    >
                        <h3>Último login</h3>
                    </Box>
                    <Box
                        sx={{
                            width: "10%",
                            justifyContent: "center",
                        }}
                    >
                        <h3>Ativar/Desativar</h3>
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
