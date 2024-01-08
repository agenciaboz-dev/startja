import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"

interface ProductRowProps {
    product: Product
}

export const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

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
                    alignItems: "center",
                    flex: 1,
                    gap: isMobile ? "20vw" : "2vw",
                }}
            >
                <Box
                    sx={{
                        flex: 0.45,
                        minWidth: isMobile ? "25vw" : "",
                    }}
                >
                    <p>{product.name}</p>
                </Box>
                <Box
                    sx={{
                        flex: 0.5,
                        minWidth: isMobile ? "25vw" : "",
                    }}
                >
                    <p>{product.ncm}</p>
                </Box>
                <Box
                    sx={{
                        flex: 0.05,
                        justifyContent: "center",
                    }}
                >
                    <FormatListBulletedOutlinedIcon />
                </Box>
            </Box>
        </Box>
    )
}