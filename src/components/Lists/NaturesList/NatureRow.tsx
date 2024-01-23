import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { ToggleSwitch } from "../../ToggleSwitch"

interface NatureRowProps {
    nature: Natureza
}

export const NatureRow: React.FC<NatureRowProps> = ({ nature }) => {
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
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                    gap: isMobile ? "20vw" : "2vw"
                }}>
                <Box
                    sx={{
                        flex: 0.7,
                        alignItems: "center"
                    }}>
                    <p>{nature.motive}</p>
                    {/* <p>Elementum senectus diam neque aliquet</p> */}
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        flex: 0.1,
                        justifyContent: "center"
                    }}>
                    <VisibilityOutlinedIcon />
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        flex: 0.1,
                        justifyContent: "center"
                    }}>
                    <EditOutlinedIcon />
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        flex: 0.1,
                        justifyContent: "center"
                    }}>
                    <ToggleSwitch nature={nature} />
                </Box>
            </Box>
        </Box>
    )
}
