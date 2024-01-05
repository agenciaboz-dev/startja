import React from "react"
import { Box, Button, Checkbox, IconButton, Tooltip } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import { colors } from "../../../style/colors"
import { Download, PictureAsPdf } from "@mui/icons-material"

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
                    <p>{new Date(Number(invoice.emissionDatetime)).toLocaleString("pt-br")}</p>
                </Box>
                <Box sx={{ flex: 1, justifyContent: "center" }}>
                    {invoice.serie}/{invoice.numero}
                </Box>
                <Box sx={{ flex: 1, justifyContent: "center" }}>
                    <p>{invoice.destinatario.name}</p>
                </Box>
                <Box sx={{ flex: 1, justifyContent: "center" }}>{invoice.emitente.name}</Box>
                <Box sx={{ flex: 1, justifyContent: "center" }}>
                    <IconButton
                        color="primary"
                        disabled={invoice.status != "autorizado"}
                        onClick={() => window.open(`https://homologacao.focusnfe.com.br${invoice.url_xml}`, "_new")}>
                        <Download />
                    </IconButton>
                    <IconButton
                        color="primary"
                        disabled={invoice.status != "autorizado"}
                        onClick={() => window.open(`https://homologacao.focusnfe.com.br${invoice.url_pdf}`, "_new")}>
                        <PictureAsPdf />
                    </IconButton>
                </Box>
                <Box sx={{ flex: 1, color: colors.primary, justifyContent: "center" }}>R$ {invoice.valor_total.toString().replace(".", ",")}</Box>
                <Box sx={{ flex: 1, justifyContent: "center" }}>
                    <Tooltip title={invoice.mensagem_sefaz}>
                        <Button
                            variant="contained"
                            sx={{
                                flex: 1,
                                borderRadius: "20px",
                                textTransform: "unset"
                            }}>
                            {invoice.status}
                        </Button>
                    </Tooltip>
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
