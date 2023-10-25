import React from "react"
import { Box } from "@mui/material"
import { colors } from "../../style/colors"
import { AdmSidebar } from "../../components/AdmSidebar"
import { Header } from "../../components/Header"
import { DataToolbar } from "../../components/DataToolbar"
import { AdmCustomersScreen } from "./AdmCustomersScreen"

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
                <AdmCustomersScreen />
            </Box>
        </Box>
    )
}
