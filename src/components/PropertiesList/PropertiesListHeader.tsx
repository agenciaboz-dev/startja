import React from "react"
import { Box, Checkbox } from "@mui/material"

interface PropertiesListHeaderProps {}

export const PropertiesListHeader: React.FC<PropertiesListHeaderProps> = ({}) => {
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
                        <h3>NIRT</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >
                        <h3>Inscrição estadual</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >
                        <h3>Endereço</h3>
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
