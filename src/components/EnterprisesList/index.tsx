import React from "react"
import { Box } from "@mui/material"
import { EnterpriseRow } from "./EnterpriseRow"
// import { useEnterprise } from "../../hooks/useEnterprise"

interface EnterprisesListProps {
    // Enterprise: Enterprise
}

export const EnterprisesList: React.FC<EnterprisesListProps> = ({ Enterprise }) => {
    // const Enterprises = useEnterprise()

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5rem 0",
            }}
        >
            {/* {Enterprises.list.map(Enterprise => <EnterpriseRow key={Enterprise.id} Enterprise={Enterprise} />)} */}
            <EnterpriseRow />
        </Box>
    )
}
