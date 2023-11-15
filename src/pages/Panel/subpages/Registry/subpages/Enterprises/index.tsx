import React, { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { colors } from "../../../../../../style/colors"
import { Sidebar } from "../../../../../../components/Sidebar"
import { Header } from "../../../../../../components/Header"
import { Toolbar } from "../../../../../../components/Toolbar"
import { useHeader } from "../../../../../../hooks/useHeader"
import { EnterprisesListHeader } from "../../../../../../components/EnterprisesList/EnterprisesListHeader"
import { EnterprisesList } from "../../../../../../components/EnterprisesList"

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

    return (
        <>
            <Toolbar
                searchPlaceholder="pessoas e empresas"
                addButtonPlaceholder="Adicionar pessoa ou empresa"
                addButtonCallback={openEnterpriseModal}
            />
            <Box
                sx={{
                    flex: 1,
                    padding: "1rem 1.5rem 1rem 0.5rem",
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
            {/* <AddEnterpriseModal open={isAddEnterpriseModalOpen} onClose={() => setAddEnterpriseModalOpen(false)} /> */}
        </>
    )
}
