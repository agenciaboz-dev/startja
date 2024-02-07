import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"

interface InstallmentsListHeaderProps {}

export const InstallmentsListHeader: React.FC<InstallmentsListHeaderProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const cellStyle = {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    }

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
                    width: isMobile ? "100%" : "100%",
                    marginBottom: "1vw",
                }}
            >
                <Box
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        flex: 1,
                        gap: isMobile ? "10vw" : "",
                    }}
                >
                    <Box
                        sx={{
                            ...cellStyle,
                            flex: 1,
                        }}
                    >
                        <h3>Número</h3>
                    </Box>
                    <Box
                        sx={{
                            ...cellStyle,
                            flex: 1,
                        }}
                    >
                        <h3>Valor</h3>
                    </Box>
                    <Box
                        sx={{
                            ...cellStyle,
                            flex: 1,
                        }}
                    >
                        <h3>Vencimento</h3>
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
