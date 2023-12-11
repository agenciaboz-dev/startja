import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"

interface AddedTaxationRuleRowProps {
    // addedTaxationRule : AddedTaxationRule
}

export const AddedTaxationRuleRow: React.FC<AddedTaxationRuleRowProps> = ({ addedTaxationRule }) => {
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
                    gap: isMobile ? "5vw" : "",
                }}
            >
                <Box
                    sx={{
                        alignItems: "center",
                        flex: 0.1,
                    }}
                >
                    <p>SP</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 0.1,
                    }}
                >
                    <p>00000001</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 0.25,
                    }}
                >
                    <p>SIT FERMENTUM</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 0.2,
                    }}
                >
                    <p>Nulla lacus etiam</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 0.25,
                    }}
                >
                    <p>32 - Morbi</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 0.05,
                    }}
                >
                    <FormatListBulletedOutlinedIcon />
                </Box>
            </Box>
        </Box>
    )
}