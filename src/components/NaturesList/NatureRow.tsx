import React from "react"
import { Box, Checkbox } from "@mui/material"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { ToggleSwitch } from "../ToggleSwitch"

interface NatureRowProps {
    nature: Nature
}

export const NatureRow: React.FC<NatureRowProps> = ({ nature }) => {
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
                <Box
                    sx={{
                        width: "70%",
                        alignItems: "center",
                    }}
                >
                    <p>{nature.motive}</p>
                    {/* <p>Elementum senectus diam neque aliquet</p> */}
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        width: "10%",
                        justifyContent: "center",
                    }}
                >
                    <VisibilityOutlinedIcon />
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        width: "10%",
                        justifyContent: "center",
                    }}
                >
                    <EditOutlinedIcon />
                </Box>
                <Box
                    sx={{
                        width: "10%",
                        justifyContent: "center",
                    }}
                >
                    <ToggleSwitch />
                </Box>
            </Box>
        </Box>
    )
}