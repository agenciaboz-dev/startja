import React from "react"
import { Box } from "@mui/material"
import { colors } from "../../style/colors"
import { AdmSidebar } from "../../components/AdmSidebar"
import { Header } from "../../components/Header"
import { DataToolbar } from "../../components/DataToolbar"
import { AdmCustomersScreen } from "./AdmCustomersScreen"
import { Route, Routes } from "react-router-dom"
import { AdmProductsScreen } from "./AdmProductsScreen"

interface AdmPanelProps {
    user: User
}

export const AdmPanel: React.FC<AdmPanelProps> = ({ user }) => {
    return (
        <Box
            sx={{
                backgroundColor: colors.background,
                width: "100%",
                overflow: "hidden"
            }}
        >
            <AdmSidebar />
            <Box
                sx={{
                    width: "90%",
                    flexDirection: "column",
                }}
            >
                <Header />
                <DataToolbar />
                <Routes>
                    <Route index element={<AdmCustomersScreen />} />
                    <Route path="/admcustomers/" element={<AdmCustomersScreen />} />
                    <Route path="/admproducts/" element={<AdmProductsScreen />} />
                </Routes>
            </Box>
        </Box>
    )
}
