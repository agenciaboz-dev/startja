import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { AccountRow } from "./AccountRow"

interface AccountsListProps {}

export const AccountsList: React.FC<AccountsListProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                margin: isMobile ? "2vw 0" : "0.5vw 0",
                gap: isMobile ? "2vw" : "",
            }}
        >
            <AccountRow />
        </Box>
    )
}
