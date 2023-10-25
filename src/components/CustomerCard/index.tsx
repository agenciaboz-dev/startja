import React from "react"
import { Box, Button, TextField } from "@mui/material"

interface CustomerCardProps {}

export const CustomerCard: React.FC<CustomerCardProps> = ({}) => {
    return (
        <Box
            sx={{
                height: "15rem",
                width: "20rem",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 2px 2px 2px #d1d1d1",
                flexDirection: "column",
                padding: "1rem"
            }}
        >
            <p>[Nome do Cliente]</p>
            <p>Cliente há x dias</p>

            <p>CPF: 000.000.000-00</p>
            <p>Cidade/UF</p>
            <p>Certificado digital expira em: 00/00/00</p>

            <p>cliente@email.com.br</p>
            <p>00 0 0000-0000</p>
        </Box>
    )
}