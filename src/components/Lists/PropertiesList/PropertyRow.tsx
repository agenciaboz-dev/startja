import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"

interface PropertyRowProps {
    // property : Property
}

export const PropertyRow: React.FC<PropertyRowProps> = ({ property }) => {
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
                    alignItems: "center",

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
                    <p>Elementum senectus diam neque aliquet</p>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <p>95522</p>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <p>12315/85</p>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <p>Cras lobortis sollicitudin consectetur aliquet</p>
                </Box>
                <Box
                    sx={{
                        width: "5%",
                        justifyContent: "center",
                    }}
                >
                    <FormatListBulletedOutlinedIcon />
                </Box>
            </Box>
        </Box>
    )
}
