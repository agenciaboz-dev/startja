import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { InstallmentRow } from "./InstallmentRow"

interface InstallmentsListProps {}

export const InstallmentsList: React.FC<InstallmentsListProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5vw 0",
            }}
        >
            <InstallmentRow />
        </Box>
    )
}
