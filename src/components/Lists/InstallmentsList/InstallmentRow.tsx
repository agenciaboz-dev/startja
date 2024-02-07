import React from "react"
import { Box, Checkbox, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material"
import { colors } from "../../../style/colors"

interface InstallmentRowProps {}

export const InstallmentRow: React.FC<InstallmentRowProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const cellStyle = {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    }

    return (
        <Box
            sx={{
                alignItems: "center",
                width: "100%",
                ":hover": {
                    backgroundColor: colors.background2,
                },
            }}
        >
            <Box
                sx={{
                    justifyContent: "space-between",
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
                    <p>1</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 1,
                    }}
                >
                    <p>R$129,90</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 1,
                    }}
                >
                    <p>06/02/2025</p>
                </Box>
            </Box>
        </Box>
    )
}
