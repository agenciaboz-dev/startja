import React, { useState } from "react"
import { Box } from "@mui/material"

interface PanelProps {
    user: User
}

export const Panel: React.FC<PanelProps> = ({ user }) => {
    return (
        <Box
            sx={{
                backgroundColor: "white"
            }}
        >
            <p
                style={{
                    color: "black"
                }}
            >
                Painel
            </p>
        </Box>
    )
}
