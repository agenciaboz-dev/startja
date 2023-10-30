import React from "react"
import { Box } from "@mui/material"
import { colors } from "../../style/colors"
import { Header } from "../../components/Header"
import { DataToolbar } from "../../components/DataToolbar"

interface CompanySelectionProps {
    user: User
}

export const CompanySelection: React.FC<CompanySelectionProps> = ({ user }) => {
    return (
        <Box
            sx={{
                backgroundColor: colors.background,
                width: "100%",
                overflow: "hidden"
            }}
        >
            <Box
                sx={{
                    width: "100%",
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
                    
                </Box>
            </Box>
        </Box>
    )
}
