import React from "react"
import { Box } from "@mui/material"
import { colors } from "../../../../style/colors"
import { Route, Routes } from "react-router-dom"
import { Header } from "../../../../components/Header"

interface ConfigProps {
    user: User
}

export const Config: React.FC<ConfigProps> = ({ user }) => {
    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "2rem",
                height: "100%"
            }}
        >
            <Header />
            <Box
                sx={{
                    backgroundColor: colors.background,
                    flex: 1
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        flexDirection: "column",
                        overflow: "hidden",
                        gap: "2rem",
                        height: "100%"
                    }}
                >
                    {/* <Routes>
                        <Route index element={<MyAccount user={user} />} />
                        <Route path="/pessoas-e-empresas/" element={<MyAccount user={user} />} />
                        <Route path="/produtos/" element={<Users />} />
                        <Route path="/naturezas-de-operacao/" element={<Options />} />
                        <Route path="/propriedades/" element={<Integrations />} />
                        <Route path="/contas/" element={<LCDPRExport />} />
                    </Routes> */}
                </Box>
            </Box>
        </Box>
    )
}
