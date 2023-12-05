import React from "react"
import { Box } from "@mui/material"
import { colors } from "../../../../style/colors"
import { Route, Routes } from "react-router-dom"
import { Header } from "../../../../components/Header"
import { Enterprises } from "./subpages/Enterprises"
import { Products } from "./subpages/Products"
import { Natures } from "./subpages/Natures"
import { Properties } from "./subpages/Properties"
import { Accounts } from "./subpages/Accounts"

interface RegistryProps {
    user: User
}

export const Registry: React.FC<RegistryProps> = ({ user }) => {
    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "1vw",
                flex: 1,
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
                        gap: "2vw",
                        height: "100%",
                    }}
                >
                    <Routes>
                        <Route index element={<Enterprises user={user} />} />
                        <Route path="/pessoas-e-empresas/" element={<Enterprises user={user} />} />
                        <Route path="/produtos/" element={<Products />} />
                        <Route path="/naturezas-de-operacao/" element={<Natures />} />
                        <Route path="/propriedades/" element={<Properties />} />
                        <Route path="/contas/" element={<Accounts />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    )
}
