import React from "react"
import { Box, Button, Grid, Avatar as MuiAvatar, useMediaQuery } from "@mui/material"
import { colors } from "../../style/colors"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"
import { useNavigate } from "react-router-dom"
import { useCompany } from "../../hooks/useCompany"

interface CompanyCardProps {
    company: Company
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const { setSelectedCompany } = useCompany()

    const selectCompany = () => {
        setSelectedCompany(company)
        navigate(`/painel`)
    }

    return (
        <Grid item xs={isMobile ? 12 : 2}>
            <Box
                sx={{
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    flexDirection: "column",
                    padding: isMobile ? "5vw" : "1vw",
                    gap: isMobile ? "5vw" : "1vw",
                    color: colors.text.greyish,
                }}
            >
                <MuiAvatar sx={{ backgroundColor: colors.secondary }} />
                <Box sx={{ flexDirection: "column", alignItems: "center", gap: isMobile ? "2vw" : "0.5vw" }}>
                    <p>CNPJ: {company.document}</p>
                    <p style={{ fontWeight: "bold", textTransform: "unset" }}>{company.name}</p>
                    <p>
                        {company.city} / {company.state}
                    </p>
                </Box>
                <Button variant="contained" sx={{ borderRadius: "20px", textTransform: "unset", gap: "0.5vw" }} onClick={() => selectCompany()}>
                    <LoginOutlinedIcon />
                    <p>Acessar Empresa</p>
                </Button>
            </Box>
        </Grid>
    )
}
