import React, { useEffect, useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { EnterpriseRow } from "./EnterpriseRow"
import AddCompanyModal from "../../Modals/AddCompanyModal"

interface EnterprisesListProps {
    enterprises: Company[]
}

export const EnterprisesList: React.FC<EnterprisesListProps> = ({ enterprises }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentCompany, setCurrentCompany] = useState<Company>()

    const closeModal = () => {
        setIsModalOpen(false)
        setCurrentCompany(undefined)
    }

    useEffect(() => {
        setIsModalOpen(!!currentCompany)
    }, [currentCompany])

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                margin: isMobile ? "5vw 0" : "0.5vw 0",
                gap: isMobile ? "5vw" : "",
            }}
        >
            {enterprises.map((enterprise) => (
                <EnterpriseRow key={enterprise.id} enterprise={enterprise} editCompany={setCurrentCompany} />
            ))}
            <AddCompanyModal open={isModalOpen} onClose={closeModal} currentCompany={currentCompany} />
        </Box>
    )
}
