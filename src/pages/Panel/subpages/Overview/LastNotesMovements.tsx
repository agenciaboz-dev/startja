import React, { useState } from "react"
import { Box, Button, Paper } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import AddInvoiceModal from "../Issuance/AddInvoiceModal"
import { SectionTitle } from "../../../../components/SectionTitle"
import { MovementsChart } from "./MovementsChart"

interface LastNotesMovementsProps {
    company: Company
}

export const LastNotesMovements: React.FC<LastNotesMovementsProps> = ({ company }) => {
    const [isAddInvoiceModalOpen, setAddInvoiceModalOpen] = useState(false)
    const openInvoiceModal = () => {
        setAddInvoiceModalOpen(true)
    }
    return (
        <Box sx={{ flex: "0.5", gap: "1vw", flexDirection: "column" }}>
            <Box sx={{ alignContent: "center", justifyContent: "space-between", width: "100%" }}>
                <Box sx={{ gap: "1vw", alignItems: "center" }}>
                    <SectionTitle>Movimentação das últimas notas</SectionTitle>
                    <Button sx={{ textTransform: "none", borderRadius: "30px" }}>Ver últimas notas</Button>
                </Box>
                <Button variant="contained" onClick={openInvoiceModal} sx={{ borderRadius: "30px", textTransform: "unset" }}>
                    <AddOutlinedIcon />
                    Emitir Nota Fiscal
                </Button>
            </Box>
            <Paper
                sx={{
                    backgroundColor: "white",
                    borderRadius: "15px",
                    flex: 1,
                    flexDirection: "column",
                    padding: "1vw 1vw 0 0"
                }}>
                <MovementsChart company={company} />
            </Paper>
            <AddInvoiceModal open={isAddInvoiceModalOpen} onClose={() => setAddInvoiceModalOpen(false)} />
        </Box>
    )
}
