import React from "react"
import { Box } from "@mui/material"
import { colors } from "../../../../style/colors"
import { Route, Routes } from "react-router-dom"
import { Header } from "../../../../components/Header"
import { IssuedInvoices } from "./subpages/IssuedInvoices"
import { Products } from "./subpages/Products"
import { Natures } from "./subpages/Natures"
import { Properties } from "./subpages/Properties"
import { Accounts } from "./subpages/Accounts"

interface ReportsProps {
    user: User
}

export const Reports: React.FC<ReportsProps> = ({ user }) => {
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
                        gap: "2vw",
                        height: "100%",
                    }}
                >
                    <Routes>
                        <Route index element={<IssuedInvoices user={user} />} />
                        <Route path="/notas-fiscais-emitidas/" element={<IssuedInvoices user={user} />} />
                        <Route path="/produtos-vendidos/" element={<Products />} />
                        <Route path="/livro-caixa/" element={<Natures />} />
                        <Route path="/plano-de-contas/" element={<Properties />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    )
}
