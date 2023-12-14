import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { colors } from "../../../../style/colors"
import { Route, Routes } from "react-router-dom"
import { Header } from "../../../../components/Header"
import { ConfigMyAccount } from "./subpages/MyAccount"
import { ConfigCollaborators } from "./subpages/Collaborators"
import { ConfigOptions } from "./subpages/Options"
import { ConfigIntegrations } from "./subpages/Integrations"
import { ConfigLCDPRExport } from "./subpages/LCDPRExport"

interface ConfigProps {
    user: User
}

export const Config: React.FC<ConfigProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: isMobile ? "5vw" : "1vw",
                width: "100%",
                flex: 1,
            }}
        >
            <Header />
            <Box
                sx={{
                    backgroundColor: colors.background,
                    flex: 1,
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <Routes>
                        <Route index element={<ConfigMyAccount user={user} />} />
                        <Route path="/minha-conta/" element={<ConfigMyAccount user={user} />} />
                        <Route path="/usuarios/" element={<ConfigCollaborators user={user} />} />
                        <Route path="/opcoes/" element={<ConfigOptions user={user} />} />
                        <Route path="/integracoes/" element={<ConfigIntegrations user={user} />} />
                        <Route path="/exportar-lcdpr/" element={<ConfigLCDPRExport user={user} />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    )
}
