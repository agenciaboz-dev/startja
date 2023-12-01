import React, { useEffect } from "react"
import { Box } from "@mui/material"
import { useHeader } from "../../../../../../hooks/useHeader"
import { useLocation, useNavigate } from "react-router-dom"

interface ConfigMyAccountProps {
    user: User
}

export const ConfigMyAccount: React.FC<ConfigMyAccountProps> = ({ user }) => {
    const header = useHeader()
    const pathname = useLocation().pathname
    const navigate = useNavigate()

    useEffect(() => {
        if (pathname.split("/painel").length < 3) {
            navigate("/painel/configuracoes/minha-conta")
        }
        header.setTitle("Configurações")
    }, [])

    return (
        <>
            <Box
                sx={{
                    flex: 1,
                    padding: "1vw",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    backgroundColor: "white",
                    borderRadius: "30px",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <h2>Minha Conta</h2>
            </Box>
        </>
    )
}
