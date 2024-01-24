import React from "react"
import { Box } from "@mui/material"
import { AccountRow } from "./AccountRow"

interface AccountsListProps {}

export const AccountsList: React.FC<AccountsListProps> = ({}) => {
    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5vw 0",
            }}
        >
            <AccountRow />
        </Box>
    )
}
