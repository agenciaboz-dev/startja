import React, { useEffect } from "react"
import { Box } from "@mui/material"
import { useHeader } from "../../../../../../hooks/useHeader"

interface ConfigOptionsProps {
    user: User
}

export const ConfigOptions: React.FC<ConfigOptionsProps> = ({ user }) => {
    const header = useHeader()
    useEffect(() => {
        header.setTitle("Configurações")
    }, [])

    return (
        <>
            <Box
                sx={{
                    flex: 1,
                    padding: "1.5vw",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    backgroundColor: "white",
                    borderRadius: "30px",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <h2>Opções</h2>
            </Box>
        </>
    )
}
