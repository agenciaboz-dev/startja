import React, { useEffect, useState } from "react"
import { Box, Grid } from "@mui/material"
import { colors } from "../../style/colors"
import { Header } from "../../components/Header"
import { Toolbar } from "../../components/Toolbar"
import { CompanyCard } from "../../components/CompanyCard"
import { useIo } from "../../hooks/useIo"
import { useHeader } from "../../hooks/useHeader"
import normalize from "../../tools/normalize"

interface CompanySelectionProps {
    user: Customer
}

export const CompanySelection: React.FC<CompanySelectionProps> = ({ user }) => {
    // const companies = user.companies
    const header = useHeader()
    const io = useIo()

    const [companies, setCompanies] = useState(user.companies)

    const handleSearch = (text: string) => {
        setCompanies(user.companies.filter((company) => normalize(company.name).includes(text)))
    }

    useEffect(() => {
        setCompanies(user.companies)
    }, [user.companies])

    useEffect(() => {
        header.setTitle("Selecionar empresa")
        io.emit("company:list")
    }, [])

    return (
        <Box
            sx={{
                backgroundColor: colors.background,
                width: "100%",
                height: "100%",
                overflow: "hidden"
            }}>
            <Box
                sx={{
                    width: "100%",
                    flexDirection: "column",
                    overflowY: "auto",
                    padding: "2vw",
                    gap: "2vw"
                }}>
                <Header />
                <Toolbar searchPlaceholder="empresa" onSearch={handleSearch} />
                <Box sx={{}}>
                    <Grid container spacing={5} columns={7}>
                        {companies.map((company) => (
                            <CompanyCard key={company.id} company={company} />
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}
