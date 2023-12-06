import React from "react"
import { Box, Checkbox } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"

interface InvoiceModalProductRowProps {
    product: Product
}

export const InvoiceModalProductRow: React.FC<InvoiceModalProductRowProps> = ({ product }) => {
    const slotStyle = {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    }

    return (
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
                }}
            >
                <Box sx={{ ...slotStyle, justifyContent: "start" }}>{product.name}</Box>
                <Box sx={slotStyle}>1</Box>
                <Box sx={slotStyle}>R$5,00</Box>
                <Box sx={slotStyle}>R$1,00</Box>
                <Box sx={slotStyle}>R$4,00</Box>
                <Box sx={slotStyle}>20%</Box>
                <Box sx={{ ...slotStyle, flex: 0.5 }}>
                    <FormatListBulletedOutlinedIcon />
                </Box>
            </Box>
        </Box>
    )
}
