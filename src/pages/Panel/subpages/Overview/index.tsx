import React, { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import { Header } from "../../../../components/Header"
import { useHeader } from "../../../../hooks/useHeader"
import { TaxSimulator } from "./TaxSimulator"
import { LastNotesMovements } from "./LastNotesMovements"
import { useLocation, useNavigate } from "react-router-dom"
import { FiscalMonitor } from "./FiscalMonitor"

interface OverviewProps {
    user: User
    company: Company
}

export const Overview: React.FC<OverviewProps> = ({ user, company }) => {
    const header = useHeader()
    const pathname = useLocation().pathname
    const navigate = useNavigate()

    useEffect(() => {
        if (pathname.split("/painel").length < 3) {
            navigate("/painel/visao-geral")
        }

        header.setTitle("Visão geral")
    }, [])

    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "1vw",
                height: "100%",
            }}
        >
            <Header />
            <Box sx={{ height: "100%", width: "100%" }}>
                <Box sx={{ height: "100%", width: "100%", gap: "2vw" }}>
                    <Box sx={{ flexDirection: "column", height: "100%", flex: 0.8, gap: "2vw" }}>
                        <TaxSimulator company={company} />
                        <LastNotesMovements company={company} />
                    </Box>
                    <FiscalMonitor company={company} />
                </Box>
            </Box>
        </Box>
    )
}
