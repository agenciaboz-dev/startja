import React, { useEffect, useState } from "react"
import { Box, Button, useMediaQuery } from "@mui/material"
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
    const isMobile = useMediaQuery("(orientation: portrait)")
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
                gap: isMobile ? "5vw" : "1vw",
                flex: 1,
            }}
        >
            <Header />
            <Box sx={{ height: "100%", width: "100%" }}>
                <Box sx={{ height: "100%", width: "100%", flex: 1, gap: isMobile ? "5vw" : "2vw", flexDirection: isMobile ? "column" : "row" }}>
                    <Box
                        sx={{
                            flexDirection: "column",
                            height: "100%",
                            flex: isMobile ? 1 : 0.8,
                            gap: isMobile ? "5vw" : "2vw",
                            alignItems: isMobile ? "center" : "normal",
                        }}
                    >
                        <TaxSimulator company={company} />
                        <LastNotesMovements company={company} />
                    </Box>
                    <Box sx={{ height: "100%", flex: isMobile ? 1 : 0.2, justifyContent: "center" }}>
                        <FiscalMonitor company={company} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
