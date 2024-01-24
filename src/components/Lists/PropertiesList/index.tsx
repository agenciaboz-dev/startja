import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { PropertyRow } from "./PropertyRow"
import AddPropertyModal from "../../Modals/AddPropertyModal"

interface PropertiesListProps {
    properties: Property[]
}

export const PropertiesList: React.FC<PropertiesListProps> = ({ properties }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentProperty, setCurrentProperty] = useState<Property>()

    const closeModal = () => {
        setIsModalOpen(false)
        setCurrentProperty(undefined)
    }

    useEffect(() => {
        setIsModalOpen(!!currentProperty)
    }, [currentProperty])

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5vw 0",
            }}
        >
            {properties.map((property) => (
                <PropertyRow key={property.id} property={property} editProperty={setCurrentProperty} />
            ))}
            <AddPropertyModal open={isModalOpen} onClose={closeModal} currentProperty={currentProperty} />
        </Box>
    )
}
