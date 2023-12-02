import React from "react"
import { Box } from "@mui/material"
import { CollaboratorRow } from "./CollaboratorRow"

interface CollaboratorsListProps {
    // collaborators: Collaborator[]
}

export const CollaboratorsList: React.FC<CollaboratorsListProps> = ({ collaborators }) => {
    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5vw 0",
            }}
        >
            {/* {collaborators.map((collaborator) => (
                <CollaboratorRow key={collaborator.id} collaborator={collaborator} />
            ))} */}
            <CollaboratorRow />
        </Box>
    )
}
