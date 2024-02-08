import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { InstallmentRow } from "./InstallmentRow"

interface InstallmentsListProps {
    installmentsArray: { id: number }[]
}

export const InstallmentsList: React.FC<InstallmentsListProps> = ({ installmentsArray }) => {
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
            {installmentsArray.map((installment) => (
                <InstallmentRow key={installment.id} />
            ))}
        </Box>
    )
}
