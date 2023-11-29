import React from "react"
import { Box } from "@mui/material"
import { NatureRow } from "./NatureRow"

interface NaturesListProps {
    natures: Nature[]
}

export const NaturesList: React.FC<NaturesListProps> = ({ natures }) => {
    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5vw 0",
            }}
        >
            {natures.map((nature) => (
                <NatureRow key={nature.id} nature={nature} />
            ))}
            {/* <NatureRow /> */}
        </Box>
    )
}
