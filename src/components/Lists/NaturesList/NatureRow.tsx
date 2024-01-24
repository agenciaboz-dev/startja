import React, { useState } from "react"
import { Box, Checkbox, IconButton, useMediaQuery } from "@mui/material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { ToggleSwitch } from "../../ToggleSwitch"
import AddNatureModal from "../../Modals/AddNatureModal"

interface NatureRowProps {
    nature: Natureza
}

export const NatureRow: React.FC<NatureRowProps> = ({ nature }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [openModal, setOpenModal] = useState(false)

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
                    <IconButton color="inherit" onClick={() => setOpenModal(true)}>
                        <EditOutlinedIcon />
                    </IconButton>
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
            <AddNatureModal open={openModal} onClose={() => setOpenModal(false)} current_nature={nature} />
        </Box>
    )
}
