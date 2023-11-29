import React, { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import { Header } from "../../../../components/Header"
import { useHeader } from "../../../../hooks/useHeader"
import { TaxSimulator } from "./TaxSimulator"
import { LastNotesMovements } from "./LastNotesMovements"
import { useLocation, useNavigate } from "react-router-dom"

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
        <>
            <Header />
            <Box
                sx={{
                    height: "80vh",
                    width: "100%"
                }}>
                <Box
                    sx={{
                        height: "100%",
                        width: "100%",
                        gap: "2vw"
                    }}>
                    <Box
                        sx={{
                            flexDirection: "column",
                            height: "100%",
                            flex: "0.7",
                            gap: "2vw"
                        }}>
                        <TaxSimulator company={company} />
                        <LastNotesMovements company={company} />
                    </Box>
                    <Box
                        sx={{
                            height: "100%",
                            flex: "0.3"
                        }}>
                        <Box
                            sx={{
                                flex: 1,
                                gap: "1vw",
                                flexDirection: "column"
                            }}>
                            <Box
                                sx={{
                                    alignContent: "center",
                                    gap: "2vw",
                                    width: "100%"
                                }}>
                                <h3>Seu Monitor Fiscal</h3>
                                <Button
                                    variant="text"
                                    sx={{
                                        borderRadius: "30px",
                                        textTransform: "unset"
                                    }}>
                                    Ver Documentos
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "30px",
                                    boxShadow: "0 2px 2px 2px #d1d1d1",
                                    flex: 1,
                                    flexDirection: "column",
                                    padding: "1vw"
                                }}></Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
