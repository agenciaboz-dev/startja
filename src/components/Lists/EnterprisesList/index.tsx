import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { EnterpriseRow } from "./EnterpriseRow"
import AddCompanyModal from "../../Modals/AddCompanyModal"

interface EnterprisesListProps {
    enterprises: Company[]
}

export const EnterprisesList: React.FC<EnterprisesListProps> = ({ enterprises }) => {
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
                overflowY: "auto",
                margin: "0.5vw 0",
            }}
        >
            {enterprises.map((enterprise) => (
                <EnterpriseRow key={enterprise.id} enterprise={enterprise} editCompany={setCurrentCompany} />
            ))}
            <AddCompanyModal open={isModalOpen} onClose={closeModal} currentCompany={currentCompany} />
        </Box>
    )
}
