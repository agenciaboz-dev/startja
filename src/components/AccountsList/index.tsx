import React from "react"
import { Box } from "@mui/material"
import { AccountRow } from "./AccountRow"
// import { useAccount } from "../../hooks/useAccount"

interface AccountsListProps {}

export const AccountsList: React.FC<AccountsListProps> = ({}) => {
    // const properties = useAccount()

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5vw 0",
            }}
        >
            {/* {properties.list.map(property => <AccountRow key={property.id} property={property} />)} */}
            <AccountRow />
        </Box>
    )
}
