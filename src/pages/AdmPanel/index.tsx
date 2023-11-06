import React from "react"
import { Box } from "@mui/material"
import { colors } from "../../style/colors"
import { AdmSidebar } from "../../components/AdmSidebar"
import { Header } from "../../components/Header"
import { DataToolbar } from "../../components/DataToolbar"
import { Route, Routes } from "react-router-dom"
import { Customers } from "./subpages/Customers"
import { Products } from "./subpages/Products"
import { Operations } from "./subpages/Operations"

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
                        <Route index element={<Customers />} />
                        <Route path="/clientes/" element={<Customers />} />
                        <Route path="/produtos/" element={<Products />} />
                        <Route path="/natureza_da_operacao/" element={<Operations />} />
                        {/* <Route path="/categorias/" element={<Products />} /> */}
                    </Routes>
                </Box>
            </Box>
        </Box>
    )
}
