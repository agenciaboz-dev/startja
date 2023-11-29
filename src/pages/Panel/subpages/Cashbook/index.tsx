import React, { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import { Header } from "../../../../components/Header"
import { useHeader } from "../../../../hooks/useHeader"

interface CashbookProps {
    user: User
    company: Company
}

export const Cashbook: React.FC<CashbookProps> = ({ user, company }) => {
    const header = useHeader()
    useEffect(() => {
        header.setTitle("Livro-caixa")
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
                                <h3>Lorem Ipsum</h3>
                                <Button
                                    variant="text"
                                    sx={{
                                        borderRadius: "30px",
                                        textTransform: "unset"
                                    }}>
                                    Selecionar
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
