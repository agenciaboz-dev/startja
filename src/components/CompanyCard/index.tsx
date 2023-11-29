import React from "react"
import { Box, Button, Grid, Avatar as MuiAvatar } from "@mui/material"
import { colors } from "../../style/colors"
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useNavigate } from "react-router-dom";
import { useCompany } from "../../hooks/useCompany"

interface CompanyCardProps {
    company: Company
}

export const CompanyCard: React.FC<CompanyCardProps> = ({company}) => {
    const navigate = useNavigate()
    const { setSelectedCompany } = useCompany()

    const selectCompany = () => {
        setSelectedCompany(company)
        navigate(`/painel`)
    }
    
    return (
        <Grid item xs={1}>
            <Box
                sx={{
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: "30px",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    flexDirection: "column",
                    padding: "1vw",
                    gap: "1vw",
                    color: colors.text.greyish
                }}>
                <MuiAvatar sx={{ backgroundColor: colors.secondary }} />
                <Box sx={{ flexDirection: "column", alignItems: "center" }}>
                    <p>CNPJ: {company.document}</p>
                    <p style={{ fontWeight: "bold", textTransform: "unset" }}>{company.name}</p>
                    <p>
                        {company.city} / {company.state}
                    </p>
                </Box>
                <Button variant="contained" sx={{ borderRadius: "30px", textTransform: "unset", gap: "0.5vw" }} onClick={() => selectCompany()}>
                    <LoginOutlinedIcon />
                    <p>Acessar Empresa</p>
                </Button>
            </Box>
        </Grid>
    )
}