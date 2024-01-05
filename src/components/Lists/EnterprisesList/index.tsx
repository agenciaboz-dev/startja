import React from "react"
import { Box } from "@mui/material"
import { EnterpriseRow } from "./EnterpriseRow"
// import { useEnterprise } from "../../hooks/useEnterprise"

interface EnterprisesListProps {
    enterprises: Company[]
}

export const EnterprisesList: React.FC<EnterprisesListProps> = ({ enterprises }) => {
    // const Enterprises = useEnterprise()

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5vw 0"
            }}>
            {/* {Enterprises.list.map(Enterprise => <EnterpriseRow key={Enterprise.id} Enterprise={Enterprise} />)} */}
            {enterprises.map((enterprise) => (
                <EnterpriseRow key={enterprise.id} enterprise={enterprise} />
            ))}
        </Box>
    )
}
