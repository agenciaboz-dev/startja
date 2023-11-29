import React from "react"
import { Box } from "@mui/material"
import { colors } from "../../style/colors"
import { Sidebar } from "../../components/Sidebar"
import { Route, Routes } from "react-router-dom"
import { Overview } from "./subpages/Overview"
import { Issuance } from "./subpages/Issuance"
import { Registry } from "./subpages/Registry"
import { Cashbook } from "./subpages/Cashbook"
import { Config } from "./subpages/Config"
import { useCompany } from "../../hooks/useCompany"

interface PanelProps {
    user: Customer
}

export const Panel: React.FC<PanelProps> = ({ user }) => {
    const { selectedCompany } = useCompany()

    return (
        <Box
            sx={{
                backgroundColor: colors.background,
                width: "100%",
                overflow: "hidden",
                height: "100%"
            }}>
            <Sidebar />
            <Box
                sx={{
                    flex: 1,
                    flexDirection: "column",
                    overflow: "hidden",
                    padding: "2vw",
                    gap: "2vw",
                    height: "100%"
                }}>
                <Routes>
                    <Route path="/configuracoes/*" element={<Config user={user} />} />
                    <Route index element={<Overview user={user} />} />
                    <Route path="/visao-geral/" element={<Overview user={user} />} />
                    <Route path="/notas-fiscais/" element={<Issuance user={user} />} />
                    <Route path="/livro-caixa/" element={<Cashbook user={user} />} />
                    <Route path="/cadastros-gerais/*" element={<Registry user={user} />} />
                </Routes>
            </Box>
        </Box>
    )
}
