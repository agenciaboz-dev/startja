import React from "react"
import { Box } from "@mui/material"
import { OperationRow } from "./OperationRow"
import { useOperation } from "../../hooks/useOperation"

interface OperationsListProps {
    // operation: Operation
}

export const OperationsList: React.FC<OperationsListProps> = ({operation}) => {
    const operations = useOperation()

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5rem 0"
            }}    
        >
            {/* {operations.list.map(operation => <OperationRow key={operation.id} operation={operation} />)} */}
            <OperationRow />
        </Box>
    )
}