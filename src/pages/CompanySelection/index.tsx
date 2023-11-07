import React, { useEffect } from "react"
import { Box } from "@mui/material"
import { colors } from "../../style/colors"
import { Header } from "../../components/Header"
import { Toolbar } from "../../components/Toolbar"
import { CompanyCard } from "../../components/CompanyCard"
import { useCompany } from "../../hooks/useCompany"
import { useIo } from "../../hooks/useIo"

interface CompanySelectionProps {
    user: User
}

export const CompanySelection: React.FC<CompanySelectionProps> = ({ user }) => {
    const companies = useCompany()
    const io = useIo()
    useEffect(() => {
        io.emit('company:list')
    },[])

    return (
        <Box
            sx={{
                backgroundColor: colors.background,
                width: "100%",
                overflow: "hidden"
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
                <Toolbar />
                <Box
                    sx={{
                        height: "80vh",
                        width: "100%",
                        flexWrap: "wrap",
                        gap: "2rem"
                    }}
                >
                    {companies.list.map(company => <CompanyCard key={company.id} company={company} />)}
                </Box>
            </Box>
        </Box>
    )
}
