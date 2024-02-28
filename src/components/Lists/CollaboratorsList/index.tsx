import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { CollaboratorRow } from "./CollaboratorRow"

interface CollaboratorsListProps {
    // collaborators: Collaborator[]
}

export const CollaboratorsList: React.FC<CollaboratorsListProps> = ({ collaborators }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                margin: isMobile ? "5vw 0" : "0.5vw 0",
                gap: isMobile ? "5vw" : "",
            }}
        >
            {/* {collaborators.map((collaborator) => (
                <CollaboratorRow key={collaborator.id} collaborator={collaborator} />
            ))} */}
            <CollaboratorRow />
        </Box>
    )
}
