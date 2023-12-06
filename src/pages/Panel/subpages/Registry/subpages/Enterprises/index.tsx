import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { Toolbar } from "../../../../../../components/Toolbar"
import { useHeader } from "../../../../../../hooks/useHeader"
import { EnterprisesListHeader } from "../../../../../../components/EnterprisesList/EnterprisesListHeader"
import { EnterprisesList } from "../../../../../../components/EnterprisesList"
import AddEnterpriseModal from "./AddEnterpriseModal"
import { useLocation, useNavigate } from "react-router-dom"

interface EnterprisesProps {
    user: User
}

export const Enterprises: React.FC<EnterprisesProps> = ({ user }) => {
    const header = useHeader()
    const pathname = useLocation().pathname
    const navigate = useNavigate()

    useEffect(() => {
        if (pathname.split("/painel").length < 3) {
            navigate("/painel/cadastros-gerais/pessoas-e-empresas")
        }
        header.setTitle("Cadastros gerais - Pessoas e empresas")
    }, [])

    const [isAddEnterpriseModalOpen, setAddEnterpriseModalOpen] = useState(false)
    const openEnterpriseModal = () => {
        setAddEnterpriseModalOpen(true)
    }

    const handleSearch = (text: string) => {}

    return (
        <>
            <Toolbar
                searchPlaceholder="pessoas e empresas"
                onSearch={handleSearch}
                addButtonText="Adicionar pessoa ou empresa"
                addButtonCallback={openEnterpriseModal}
            />
            <Box
                sx={{
                    flex: 1,
                    padding: "1vw 1.5vw 1vw 0.5vw",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    backgroundColor: "white",
                    borderRadius: "15px",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <EnterprisesListHeader />
                <EnterprisesList />
            </Box>
            <AddEnterpriseModal open={isAddEnterpriseModalOpen} onClose={() => setAddEnterpriseModalOpen(false)} />
        </>
    )
}
