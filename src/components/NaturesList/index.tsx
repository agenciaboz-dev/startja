import React from "react"
import { Box } from "@mui/material"
import { NatureRow } from "./NatureRow"
import { useNature } from "../../hooks/useNature"

interface NaturesListProps {}

export const NaturesList: React.FC<NaturesListProps> = ({}) => {
    const natures = useNature()

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5vw 0",
            }}
        >
            {natures.list.map((nature) => (
                <NatureRow key={nature.id} nature={nature} />
            ))}
            {/* <NatureRow /> */}
        </Box>
    )
}
