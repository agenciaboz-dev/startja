import React from "react"
import { Box } from "@mui/material"
import { colors } from "../../style/colors"
import { Sidebar } from "../../components/Sidebar"
import { Header } from "../../components/Header"
import { Toolbar } from "../../components/Toolbar"
import { Route, Routes } from "react-router-dom"
import { Overview } from "./subpages/Overview"
import { Issuance } from "./subpages/Issuance"

interface PanelProps {
    user: User
}

export const Panel: React.FC<PanelProps> = ({ user }) => {
    return (
        <Box
            sx={{
                backgroundColor: colors.background,
                width: "100%",
                overflow: "hidden"
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    width: "90%",
                    flexDirection: "column",
                    overflowY: "auto",
                    padding: "2rem",
                    gap: "2rem",
                }}
            >
                <Header />
                <Box
                    sx={{
                        height: "80vh",
                        width: "100%"
                    }}
                >
                    <Routes>
                        <Route index element={<Overview user={user} />} />
                        <Route path="/visao-geral/" element={<Overview user={user} />} />
                        <Route path="/notas-fiscais/" element={<Issuance user={user} />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    )
}
