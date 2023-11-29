import React from "react"
import { Box, Button, Checkbox } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import { colors } from "../../style/colors"

interface EnterpriseRowProps {
    // Enterprise: Enterprise
}

export const EnterpriseRow: React.FC<EnterpriseRowProps> = ({ Enterprise }) => {
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
                    gap: "2vw",
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <p>Lorem Ipsum</p>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <p>90020/151517</p>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <p>Lorem Ipsum</p>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <p>Aliquam aliquet</p>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <p>9889-6556</p>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <FormatListBulletedOutlinedIcon />
                </Box>
            </Box>
        </Box>
    )
}
