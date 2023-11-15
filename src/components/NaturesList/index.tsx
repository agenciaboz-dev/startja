import React from "react"
import { Box } from "@mui/material"
import { NatureRow } from "./NatureRow"
import { useNature } from "../../../src/hooks/useNature"

interface NaturesListProps {
    // Nature: Nature
}

export const NaturesList: React.FC<NaturesListProps> = ({ Nature }) => {
    const Natures = useNature()

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5rem 0",
            }}
        >
            {/* {Natures.list.map(Nature => <NatureRow key={Nature.id} Nature={Nature} />)} */}
            <NatureRow />
        </Box>
    )
}
