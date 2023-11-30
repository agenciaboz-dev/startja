import React, { useEffect } from "react"
import { Box } from "@mui/material"
import { useHeader } from "../../../../../../hooks/useHeader"

interface ConfigMyAccountProps {
    user: User
}

export const ConfigMyAccount: React.FC<ConfigMyAccountProps> = ({ user }) => {
    const header = useHeader()
    useEffect(() => {
        header.setTitle("Configurações")
    }, [])

    return (
        <>
            <Box
                sx={{
                    flex: 1,
                    padding: "1vw 1.5vw 1vw 0.5vw",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    backgroundColor: "white",
                    borderRadius: "30px",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <h1>Minha Conta</h1>
            </Box>
        </>
    )
}
