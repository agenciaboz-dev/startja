import React from "react"
import { Box } from "@mui/material"
import { colors } from "../../../../style/colors"
import { Route, Routes } from "react-router-dom"
import { Header } from "../../../../components/Header"
import { IssuedInvoices } from "./subpages/IssuedInvoices"
import { SoldProducts } from "./subpages/SoldProducts"
import { CashbookReports } from "./subpages/CashbookReports"
import { Plan } from "./subpages/Plan"
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
                        <Route index element={<IssuedInvoices />} />
                        <Route path="/notas-fiscais-emitidas/" element={<IssuedInvoices />} />
                        <Route path="/produtos-vendidos/" element={<SoldProducts />} />
                        <Route path="/livro-caixa/" element={<CashbookReports />} />
                        <Route path="/plano-de-contas/" element={<Plan />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    )
}
