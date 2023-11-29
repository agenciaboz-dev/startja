import React from "react"
import { Box } from "@mui/material"

interface SectionTitleProps {
    children?: React.ReactNode
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
    return <Box sx={{ fontSize: "1.3rem" }}>{children}</Box>
}
