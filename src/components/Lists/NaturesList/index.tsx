import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { NatureRow } from "./NatureRow"

interface NaturesListProps {
    natures: Natureza[]
}

export const NaturesList: React.FC<NaturesListProps> = ({ natures }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                margin: isMobile ? "2vw 0" : "0.5vw 0",
                gap: isMobile ? "2vw" : ""
            }}>
            {natures
                .sort((a, b) => a.id - b.id)
                .map((nature) => (
                    <NatureRow key={nature.id} nature={nature} />
                ))}
        </Box>
    )
}
