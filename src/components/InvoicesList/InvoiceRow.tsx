import React from "react"
import { Box, Button, Checkbox, IconButton } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import { colors } from "../../style/colors"

interface InvoiceRowProps {
    invoice: notaFiscal
}

export const InvoiceRow: React.FC<InvoiceRowProps> = ({ invoice }) => {
    console.log(invoice)

    return (
        <Box sx={{ alignItems: "center", width: "100%" }}>
            <Checkbox inputProps={{ style: { padding: "0" } }} />
            <Box sx={{ alignItems: "center", justifyContent: "space-between", flex: 1, gap: "2vw" }}>
                <Box sx={{ flex: 1 }}>
                    <p>{new Date(Number(invoice.emissionDate)).toLocaleDateString("pt-br")}</p>
                </Box>
                <Box sx={{ flex: 1, justifyContent: "center" }}>
                    <p>{invoice.series}</p>
                </Box>
                <Box sx={{ flex: 1, justifyContent: "center" }}>
                    <p>{invoice.companyId}</p>
                </Box>
                <Box sx={{ flex: 1, justifyContent: "center" }}>
                    <p>{invoice.shippingCompany}</p>
                </Box>
                <Box sx={{ flex: 1, justifyContent: "center" }}>
                    <p>{invoice.property.id}</p>
                </Box>
                <Box sx={{ flex: 1, color: colors.primary, justifyContent: "center" }}>
                    <p>R$ {invoice.totalProductValue.toString().replace(".", ",")}</p>
                </Box>
                <Box sx={{ flex: 1, justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        sx={{
                            flex: 1,
                            borderRadius: "20px",
                            textTransform: "unset",
                            pointerEvents: "none",
                        }}
                    >
                        <p>{invoice.generalInfo}</p>
                    </Button>
                </Box>
                <Box sx={{ width: "5%", justifyContent: "center" }}>
                    <IconButton>
                        <FormatListBulletedOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}