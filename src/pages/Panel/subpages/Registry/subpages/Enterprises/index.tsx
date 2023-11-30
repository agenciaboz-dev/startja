import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { Toolbar } from "../../../../../../components/Toolbar"
import { useHeader } from "../../../../../../hooks/useHeader"
import { EnterprisesListHeader } from "../../../../../../components/EnterprisesList/EnterprisesListHeader"
import { EnterprisesList } from "../../../../../../components/EnterprisesList"
import AddEnterpriseModal from "./AddEnterpriseModal"

interface EnterprisesProps {
    user: User
}

export const Enterprises: React.FC<EnterprisesProps> = ({ user }) => {
    const header = useHeader()
    useEffect(() => {
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
                addButtonPlaceholder="pessoa ou empresa"
                addButtonCallback={openEnterpriseModal}
            />
            <Box
                sx={{
                    flex: 1,
                    padding: "1vw 1.5vw 1vw 0.5vw",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    backgroundColor: "white",
                    borderRadius: "30px",
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
