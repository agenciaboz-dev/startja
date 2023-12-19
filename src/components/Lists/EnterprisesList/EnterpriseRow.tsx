import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"

interface EnterpriseRowProps {
    // Enterprise: Enterprise
}

export const EnterpriseRow: React.FC<EnterpriseRowProps> = ({ Enterprise }) => {
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
                        flex: 0.2,
                    }}
                >
                    <p>Lorem Ipsum</p>
                </Box>
                <Box
                    sx={{
                        flex: 0.2,
                        justifyContent: "center",
                    }}
                >
                    <p>90020/151517</p>
                </Box>
                <Box
                    sx={{
                        flex: 0.2,
                        justifyContent: "center",
                    }}
                >
                    <p>Lorem Ipsum</p>
                </Box>
                <Box
                    sx={{
                        flex: 0.2,
                        justifyContent: "center",
                    }}
                >
                    <p>Aliquam aliquet</p>
                </Box>
                <Box
                    sx={{
                        flex: 0.15,
                        justifyContent: "center",
                    }}
                >
                    <p>9889-6556</p>
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
