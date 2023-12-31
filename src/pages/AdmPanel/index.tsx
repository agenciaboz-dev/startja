import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { colors } from "../../style/colors"
import { AdmSidebar } from "../../components/AdmSidebar"
import { Route, Routes } from "react-router-dom"
import { Customers } from "./subpages/Customers"
import { Products } from "./subpages/Products"
import { Natures } from "./subpages/Natures"
import { Categories } from "./subpages/Categories"

interface AdmPanelProps {
    user: Admin
}

export const AdmPanel: React.FC<AdmPanelProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                backgroundColor: colors.background,
                height: "100%",
                width: "100%",
                overflow: "hidden",
            }}
        >
            <AdmSidebar />
            <Box
                sx={{
                    flex: 1,
                    flexDirection: "column",
                    overflow: "auto",
                    padding: isMobile ? "5vw" : "2vw",
                    gap: "2vw",
                }}
            >
                <Routes>
                    <Route index element={<Customers />} />
                    <Route path="/clientes/" element={<Customers />} />
                    <Route path="/produtos/" element={<Products />} />
                    <Route path="/naturezas-de-operacao/" element={<Natures />} />
                    {/* <Route path="/categorias/" element={<Categories />} /> */}
                </Routes>
            </Box>
        </Box>
    )
}