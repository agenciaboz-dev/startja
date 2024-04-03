import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { NatureRow } from "./NatureRow"
import { useUser } from "../../../hooks/useUser"

interface NaturesListProps {
    natures: Natureza[]
    disabled?: boolean
}

export const NaturesList: React.FC<NaturesListProps> = ({ natures, disabled }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { user } = useUser()


    console.log(natures)

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                margin: isMobile ? "5vw 0" : "0.5vw 0",
                gap: isMobile ? "5vw" : "",
            }}
        >
            {natures
                .filter((nature) => (user ? (nature.user_id ? nature : nature.active) : nature))
                .sort((a, b) => a.id - b.id)
                .map((nature) => (
                    <NatureRow key={nature.id} nature={nature} disabled={disabled} />
                ))}
        </Box>
    )
}
