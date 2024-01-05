import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"

interface EnterpriseRowProps {
    enterprise: Company
}

export const EnterpriseRow: React.FC<EnterpriseRowProps> = ({ enterprise }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                alignItems: "center",
                width: "100%"
            }}>
            <Checkbox
                inputProps={{
                    style: {
                        padding: "0"
                    }
                }}
            />
            <Box
                sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flex: 1,
                    gap: isMobile ? "20vw" : "2vw"
                }}>
                <Box
                    sx={{
                        flex: 0.2
                    }}>
                    {enterprise.name}
                </Box>
                <Box
                    sx={{
                        flex: 0.2,
                        justifyContent: "center"
                    }}>
                    {enterprise.document}
                </Box>
                <Box
                    sx={{
                        flex: 0.2,
                        justifyContent: "center"
                    }}>
                    {enterprise.type}
                </Box>
                <Box
                    sx={{
                        flex: 0.2,
                        justifyContent: "center"
                    }}>
                    {enterprise.city} / {enterprise.state}
                </Box>
                <Box
                    sx={{
                        flex: 0.15,
                        justifyContent: "center"
                    }}>
                    {enterprise.phone}
                </Box>
                <Box
                    sx={{
                        flex: 0.05,
                        justifyContent: "center"
                    }}>
                    <FormatListBulletedOutlinedIcon />
                </Box>
            </Box>
        </Box>
    )
}
