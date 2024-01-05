import React, { useState } from "react"
import { Box, Button, Paper, useMediaQuery } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import AddInvoiceModal from "../../../../components/Modals/AddInvoiceModal"
import { SectionTitle } from "../../../../components/SectionTitle"
import { MovementsChart } from "./MovementsChart"

interface LastNotesMovementsProps {}

export const LastNotesMovements: React.FC<LastNotesMovementsProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [isAddInvoiceModalOpen, setAddInvoiceModalOpen] = useState(false)
    const openInvoiceModal = () => {
        setAddInvoiceModalOpen(true)
    }
    return (
        <Box sx={{ flex: "0.5", gap: isMobile ? "5vw" : "1vw", flexDirection: "column", minHeight: "40vh", width: isMobile ? "90vw" : "100%" }}>
            <Box sx={{ alignContent: "center", justifyContent: "space-between", width: "100%" }}>
                <Box sx={{ gap: "1vw", alignItems: "center" }}>
                    <SectionTitle>Movimentação das últimas notas</SectionTitle>
                    <Button sx={{ textTransform: "none", borderRadius: "20px" }}>Ver últimas notas</Button>
                </Box>
                <Button variant="contained" onClick={openInvoiceModal} sx={{ borderRadius: "20px", textTransform: "unset" }}>
                    <AddOutlinedIcon />
                    Emitir Nota Fiscal
                </Button>
            </Box>
            <Paper
                elevation={3}
                sx={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    flex: 1,
                    flexDirection: "column",
                    padding: "1vw 1vw 0 0"
                }}>
                <MovementsChart />
            </Paper>
            <AddInvoiceModal open={isAddInvoiceModalOpen} onClose={() => setAddInvoiceModalOpen(false)} />
        </Box>
    )
}
