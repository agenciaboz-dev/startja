import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { NatureRow } from "./NatureRow"

interface NaturesListProps {
    natures: Nature[]
}

export const NaturesList: React.FC<NaturesListProps> = ({ natures }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: isMobile ? "2vw 0" : "0.5vw 0",
                gap: isMobile ? "2vw" : "",
                width: "100%",
            }}
        >
            {natures.map((nature) => (
                <NatureRow key={nature.id} nature={nature} />
            ))}
            {/* <NatureRow /> */}
        </Box>
    )
}
