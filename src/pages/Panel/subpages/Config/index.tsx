import React from "react"
import { Box } from "@mui/material"
import { colors } from "../../../../style/colors"
import { Route, Routes } from "react-router-dom"
import { Header } from "../../../../components/Header"
import { ConfigMyAccount } from "./subpages/MyAccount"
import { ConfigUsers } from "./subpages/Users"
import { ConfigOptions } from "./subpages/Options"
import { ConfigIntegrations } from "./subpages/Integrations"
import { ConfigLCDPRExport } from "./subpages/LCDPRExport"

interface ConfigProps {
    user: User
}

export const Config: React.FC<ConfigProps> = ({ user }) => {
    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "1vw",
                height: "100%",
            }}
        >
            <Header />
            <Box
                sx={{
                    backgroundColor: colors.background,
                    flex: 1,
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        flexDirection: "column",
                        height: "100%",
                    }}
                >
                    <Routes>
                        <Route index element={<ConfigMyAccount user={user} />} />
                        <Route path="/minha-conta/" element={<ConfigMyAccount user={user} />} />
                        <Route path="/usuarios/" element={<ConfigUsers user={user} />} />
                        <Route path="/opcoes/" element={<ConfigOptions user={user} />} />
                        <Route path="/integracoes/" element={<ConfigIntegrations user={user} />} />
                        <Route path="/exportar-lcdpr/" element={<ConfigLCDPRExport user={user} />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    )
}
