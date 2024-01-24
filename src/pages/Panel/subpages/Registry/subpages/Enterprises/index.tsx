import React, { useEffect, useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { Toolbar } from "../../../../../../components/Toolbar"
import { useHeader } from "../../../../../../hooks/useHeader"
import { EnterprisesListHeader } from "../../../../../../components/Lists/EnterprisesList/EnterprisesListHeader"
import { EnterprisesList } from "../../../../../../components/Lists/EnterprisesList"
import AddEnterpriseModal from "../../../../../../components/Modals/AddEnterpriseModal"
import { useLocation, useNavigate } from "react-router-dom"
import AddCompanyModal from "../../../../../../components/Modals/AddCompanyModal"

interface EnterprisesProps {
    user: User
}

export const Enterprises: React.FC<EnterprisesProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
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
        <Box
            sx={{
                flexDirection: "column",
                gap: isMobile ? "5vw" : "1vw",
                flex: 1,
            }}
        >
            <Toolbar
                searchPlaceholder="pessoas ou empresas"
                onSearch={handleSearch}
                addButtonText="Adicionar pessoa ou empresa"
                addButtonCallback={openEnterpriseModal}
            />
            <Box
                sx={{
                    flex: 1,
                    overflow: isMobile ? "scroll" : "",
                    padding: isMobile ? "1vw 5vw" : "",
                    margin: isMobile ? "0 -5vw" : "",
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        boxShadow: "0 2px 2px 2px #d1d1d1",
                        backgroundColor: "white",
                        borderRadius: "20px",
                        flexDirection: "column",
                        padding: isMobile ? "5vw" : "1vw 1.5vw 1vw 0.5vw",
                        width: isMobile ? "fit-content" : "100%",
                    }}
                >
                    <EnterprisesListHeader />
                    <EnterprisesList enterprises={user.companies} />
                </Box>
            </Box>
            {/* <AddEnterpriseModal open={isAddEnterpriseModalOpen} onClose={() => setAddEnterpriseModalOpen(false)} /> */}
            <AddCompanyModal open={isAddEnterpriseModalOpen} onClose={() => setAddEnterpriseModalOpen(false)} />
        </Box>
    )
}
