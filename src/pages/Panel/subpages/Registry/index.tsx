import React from "react"
import { Box } from "@mui/material"
import { colors } from "../../../../style/colors"
import { Route, Routes } from "react-router-dom"
import { Enterprises } from "./subpages/Enterprises"
import { RegistrySidebar } from "../../../../components/RegistrySidebar"
import { Header } from "../../../../components/Header"

interface RegistryProps {
    user: User
}

export const Registry: React.FC<RegistryProps> = ({ user }) => {
    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "2rem",
            }}
        >
            <Header />
            <Box
                sx={{
                    backgroundColor: colors.background,
                    flex: 1,
                    overflow: "hidden",
                }}
            >
                <RegistrySidebar />
                <Box
                    sx={{
                        flex: 1,
                        flexDirection: "column",
                        overflowY: "auto",
                        padding: "0 0.1rem 0 2rem",
                        gap: "2rem",
                    }}
                >
                    <Routes>
                        <Route index element={<Enterprises user={user} />} />
                        <Route path="/pessoas-e-empresas/" element={<Enterprises user={user} />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    )
}
