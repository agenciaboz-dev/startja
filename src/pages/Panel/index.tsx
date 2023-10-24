import React from "react"
import { Box } from "@mui/material"
import { colors } from "../../style/colors"
import { Sidebar } from "../../components/Sidebar"

interface PanelProps {
    user: User
}

export const Panel: React.FC<PanelProps> = ({ user }) => {
    return (
        <Box
            sx={{
                backgroundColor: colors.background,
                width: "100%"
            }}
        >
            <Sidebar />
        </Box>
    )
}
