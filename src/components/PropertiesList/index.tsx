import React from "react"
import { Box } from "@mui/material"
import { PropertyRow } from "./PropertyRow"
// import { useProperty } from "../../hooks/useProperty"

interface PropertiesListProps {}

export const PropertiesList: React.FC<PropertiesListProps> = ({}) => {
    // const properties = useProperty()

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5vw 0",
            }}
        >
            {/* {properties.list.map(property => <PropertyRow key={property.id} property={property} />)} */}
            <PropertyRow />
        </Box>
    )
}
