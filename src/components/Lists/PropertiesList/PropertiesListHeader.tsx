import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"

interface PropertiesListHeaderProps {}

export const PropertiesListHeader: React.FC<PropertiesListHeaderProps> = ({}) => {
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
                        <h3>NIRT</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Inscrição estadual</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Endereço</h3>
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
