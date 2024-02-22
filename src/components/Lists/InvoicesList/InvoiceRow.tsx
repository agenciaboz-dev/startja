import React from "react"
import { Box, Button, Checkbox, IconButton, Menu, MenuItem, Tooltip, useMediaQuery } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import { colors } from "../../../style/colors"
import { Edit, PictureAsPdf, FileOpen } from "@mui/icons-material"
import { CurrencyText } from "../../CurrencyText"
import { url as backend } from "../../../api/backend"
import { toolTipStyle } from "../../../style/toolTipStyle"

interface InvoiceRowProps {
    invoice: notaFiscal
    editInvoice: (invoice: notaFiscal) => void
}

export const InvoiceRow: React.FC<InvoiceRowProps> = ({ invoice, editInvoice }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const actions =
        invoice.status != "autorizado"
            ? [
                  {
                      id: 1,
                      title: "Reemitir",
                      icon: <Edit />,
                      onClick: () => {
                          editInvoice(invoice)
                          setMenuAnchorEl(null)
                      },
                  },
              ]
            : [
                  {
                      id: 1,
                      title: "Baixar XML",
                      icon: <FileOpen />,
                      onClick: async () => {
                          const url = `http${backend}/api/nfefocus/xml?url=${invoice.url_xml}`
                          window.open(url, "_blank")
                      },
                  },
                  {
                      id: 2,
                      title: "Visualizar PDF",
                      icon: <PictureAsPdf />,
                      onClick: () => window.open(`https://homologacao.focusnfe.com.br${invoice.url_pdf}`, "_new"),
                  },
              ]

    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null)
    const menu_opened = Boolean(menuAnchorEl)

    return (
        <Box
            sx={{
                alignItems: "center",
                width: "100%",
                ":hover": {
                    backgroundColor: colors.background2,
                },
            }}
        >
            <Checkbox inputProps={{ style: { padding: "0" } }} />
            <Box
                sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flex: 1,
                    width: isMobile ? "250vw" : "",
                }}
            >
                <Box sx={{ width: "10%" }}>
                    <p>{new Date(Number(invoice.emissionDatetime)).toLocaleString("pt-br")}</p>
                </Box>
                <Box sx={{ flex: 1, justifyContent: "center" }}>
                    {invoice.serie}/{invoice.numero}
                </Box>
                <Box sx={{ flex: 1, justifyContent: "center" }}>
                    <p>{invoice.destinatario.name}</p>
                </Box>
                <Box sx={{ flex: 1, color: colors.primary, justifyContent: "center" }}>
                    <CurrencyText value={invoice.valor_total} />
                </Box>
                <Box sx={{ flex: 1, justifyContent: "center" }}>
                    <Tooltip title={<Box sx={toolTipStyle}>{invoice.mensagem_sefaz}</Box>}>
                        <Button
                            variant="contained"
                            color={
                                invoice.status == "processando_autorizacao" ? "warning" : invoice.status == "erro_autorizacao" ? "error" : "primary"
                            }
                            sx={{
                                flex: 1,
                                borderRadius: "20px",
                                textTransform: "unset",
                            }}
                        >
                            {invoice.status}
                        </Button>
                    </Tooltip>
                </Box>
                <Box
                    sx={{
                        width: "5%",
                        justifyContent: "center",
                        marginLeft: "2vw",
                    }}
                    onClick={(event) => setMenuAnchorEl(event.currentTarget)}
                >
                    <IconButton>
                        <FormatListBulletedOutlinedIcon />
                    </IconButton>
                </Box>
                <Menu
                    anchorEl={menuAnchorEl}
                    open={menu_opened}
                    onClose={() => setMenuAnchorEl(null)}
                    slotProps={{ paper: { elevation: 3 } }}
                    MenuListProps={{ sx: { width: "100%" } }}
                >
                    {actions.map((action) => {
                        const Icon = () => action.icon
                        return (
                            <MenuItem sx={{ gap: isMobile ? "2vw" : "0.5vw" }} onClick={action.onClick} key={action.id}>
                                <Icon /> {action.title}
                            </MenuItem>
                        )
                    })}
                </Menu>
            </Box>
        </Box>
    )
}