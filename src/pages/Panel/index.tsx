import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { colors } from "../../style/colors"
import { Sidebar } from "../../components/Sidebar"
import { Route, Routes } from "react-router-dom"
import { Overview } from "./subpages/Overview"
import { Issuance } from "./subpages/Issuance"
import { Registry } from "./subpages/Registry"
// import { Cashbook } from "./subpages/Cashbook"
import { Config } from "./subpages/Config"
import { Reports } from "./subpages/Reports"

interface PanelProps {
    user: User
}

export const Panel: React.FC<PanelProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box sx={{ backgroundColor: colors.background, width: "100%", overflow: "hidden", height: "100%" }}>
            <Sidebar />
            <Box
                sx={{
                    flex: 1,
                    flexDirection: "column",
                    overflow: "auto",
                    padding: isMobile ? "5vw" : "2vw",
                    gap: "2vw"
                }}>
                <Routes>
                    <Route path="/configuracoes/*" element={<Config user={user} />} />
                    <Route index element={<Overview user={user} />} />
                    <Route path="/visao-geral/" element={<Overview user={user} />} />
                    <Route path="/notas-fiscais/" element={<Issuance user={user} />} />
                    <Route path="/cadastros-gerais/*" element={<Registry user={user} />} />
                    <Route path="/relatorios/*" element={<Reports user={user} />} />
                    {/* <Route path="/livro-caixa/" element={<Cashbook user={user} company={selectedCompany} />} /> */}
                </Routes>
            </Box>
        </Box>
    )
}
