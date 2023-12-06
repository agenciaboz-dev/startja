import React from "react"
import { Box, Button, Checkbox, IconButton } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import { colors } from "../../style/colors"

interface InvoiceRowProps {
    invoice: Invoice
}

export const InvoiceRow: React.FC<InvoiceRowProps> = ({ invoice }) => {
    console.log(invoice)

    return (
        <Box sx={{ alignItems: "center", width: "100%" }}>
            <Checkbox inputProps={{ style: { padding: "0" } }} />
            <Box sx={{ alignItems: "center", justifyContent: "space-between", flex: 1, gap: "2vw" }}>
                <Box sx={{ flex: 1 }}>
                    <p>{new Date(Number(invoice.emission)).toLocaleDateString("pt-br")}</p>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <p>
                        {invoice.series}/{invoice.nfe}
                    </p>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <p>{invoice.clientSupplier}</p>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <p>{invoice.issuer}</p>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <p>{invoice.property.id}</p>
                </Box>
                <Box sx={{ flex: 1, color: colors.primary }}>
                    <p>R$ {invoice.value.toString().replace(".", ",")}</p>
                </Box>
                <Button
                    variant="contained"
                    sx={{
                        flex: 1,
                        borderRadius: "15px",
                        textTransform: "unset",
                        pointerEvents: "none",
                    }}
                >
                    <p>{invoice.situation}</p>
                </Button>
                <Box sx={{ flex: 1 }}>
                    <IconButton>
                        <FormatListBulletedOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}