import React from "react"
import { Box } from "@mui/material"
import { colors } from "../../style/colors"
import { AdmSidebar } from "../../components/AdmSidebar"
import { Header } from "../../components/Header"
import { DataToolbar } from "../../components/DataToolbar"
import { CustomersScreen } from "./screens/Customers"
import { Route, Routes } from "react-router-dom"
import { ProductsScreen } from "./screens/Products"

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
                    overflowY: "auto",
                    padding: "2rem",
                    gap: "2rem",
                }}
            >
                <Header />
                <DataToolbar />
                <Box
                    sx={{
                    }}
                >
                    <Routes>
                        <Route index element={<CustomersScreen />} />
                        <Route path="/customers/" element={<CustomersScreen />} />
                        <Route path="/products/" element={<ProductsScreen />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    )
}
