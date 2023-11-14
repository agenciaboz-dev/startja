import React, { useEffect } from "react"
import { Box, Grid } from "@mui/material"
import { colors } from "../../style/colors"
import { Header } from "../../components/Header"
import { Toolbar } from "../../components/Toolbar"
import { CompanyCard } from "../../components/CompanyCard"
import { useCompany } from "../../hooks/useCompany"
import { useIo } from "../../hooks/useIo"
import { useHeader } from "../../hooks/useHeader"

interface CompanySelectionProps {
    user: User
}

export const CompanySelection: React.FC<CompanySelectionProps> = ({ user }) => {
    const companies = useCompany()
    const header = useHeader()
    const io = useIo()
    useEffect(() => {
        header.setTitle("Selecionar empresa")
        io.emit("company:list")
    }, [])

    return (
        <Box
            sx={{
                backgroundColor: colors.background,
                width: "100%",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    flexDirection: "column",
                    overflowY: "auto",
                    padding: "2rem",
                    gap: "2rem",
                }}
            >
                <Header />
                <Toolbar searchPlaceholder="empresa" />
                <Box
                    sx={{
                        height: "80vh",
                        width: "100%",
                    }}
                >
                    <Grid container>
                        {companies.list.map((company) => (
                            <CompanyCard key={company.id} company={company} />
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}
