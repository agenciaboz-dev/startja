import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { ToggleSwitch } from "../ToggleSwitch"

interface NatureRowProps {
    nature: Nature
}

export const NatureRow: React.FC<NatureRowProps> = ({ nature }) => {
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
                }}
            >
                <Box
                    sx={{
                        flex: isMobile ? 0.5 : 0.7,
                        alignItems: "center",
                    }}
                >
                    <p>{nature.motive}</p>
                    {/* <p>Elementum senectus diam neque aliquet</p> */}
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        flex: isMobile ? 0.1 : 0.1,
                        justifyContent: "center",
                    }}
                >
                    <VisibilityOutlinedIcon />
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        flex: isMobile ? 0.1 : 0.1,
                        justifyContent: "center",
                    }}
                >
                    <EditOutlinedIcon />
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        flex: isMobile ? 0.1 : 0.1,
                        justifyContent: "center",
                    }}
                >
                    <ToggleSwitch />
                </Box>
            </Box>
        </Box>
    )
}