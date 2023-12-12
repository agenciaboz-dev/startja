import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"

interface InvoiceModalProductsListHeaderProps {}

export const InvoiceModalProductsListHeader: React.FC<InvoiceModalProductsListHeaderProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const slotStyle = {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        flex: 1,
    }

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    alignItems: "center",
                    width: "100%",
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
                        gap: isMobile ? "10vw" : "",
                    }}
                >
                    <Box sx={{ ...slotStyle, justifyContent: "start" }}>
                        <h4>Produto</h4>
                    </Box>
                    <Box sx={slotStyle}>
                        <h4>Quantidade/ Unidade</h4>
                    </Box>
                    <Box sx={slotStyle}>
                        <h4>Valor unitário</h4>
                    </Box>
                    <Box sx={slotStyle}>
                        <h4>Valor desconto</h4>
                    </Box>
                    <Box sx={slotStyle}>
                        <h4>Valor total</h4>
                    </Box>
                    <Box sx={slotStyle}>
                        <h4>Tributação</h4>
                    </Box>
                    <Box sx={{ ...slotStyle, flex: 0.5 }}>
                        <h4>Ações</h4>
                    </Box>
                </Box>
            </Box>
            <hr
                style={{
                    width: "100%",
                }}
            />
        </Box>
    )
}
