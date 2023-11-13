import React from "react"
import { Box, Button, Grid, Avatar as MuiAvatar } from "@mui/material"
import { colors } from "../../style/colors"
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useNavigate } from "react-router-dom";

interface CompanyCardProps {
    company: Company
}

export const CompanyCard: React.FC<CompanyCardProps> = ({company}) => {
    const navigate = useNavigate()
    
    return (
        <Grid item xs={2}>
            <Box
                sx={{
                    alignItems: "center",
                    height: "fit-content",
                    backgroundColor: "white",
                    borderRadius: "30px",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    flexDirection: "column",
                    padding: "1rem",
                    gap: "1rem",
                    color: colors.text.greyish,
                    // flex: 1,
                }}
            >
                <MuiAvatar
                    sx={{
                        backgroundColor: colors.secondary
                    }}
                />
                <Box
                    sx={{
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    >
                    <p>CNPJ: {company.cnpj}</p>
                    <p
                        style={{
                            fontWeight: "bold",
                            textTransform: "unset"
                        }}
                    >
                        {company.name}
                        </p>
                    <p>{company.city} / {company.state}</p>
                </Box>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: "30px",
                        textTransform: "unset",
                        gap: "0.5rem",
                    }}
                    onClick={() => navigate("/painel/")}
                >
                    <LoginOutlinedIcon />
                    <p>
                        Acessar Empresa
                    </p>
                </Button>
            </Box>
        </Grid>
    )
}