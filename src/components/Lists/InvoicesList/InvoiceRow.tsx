import React from "react"
import { Box, Button, Checkbox, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import { colors } from "../../../style/colors"
import { Download, PictureAsPdf } from "@mui/icons-material"

interface InvoiceRowProps {
    invoice: notaFiscal
}

export const InvoiceRow: React.FC<InvoiceRowProps> = ({ invoice }) => {
    console.log(invoice)

    const notAuth = invoice.status != "autorizado"

    const actions = [
        {
            id: 1,
            title: "Download",
            icon: <Download color="primary" />,
            onClick: () => window.open(`https://homologacao.focusnfe.com.br${invoice.url_xml}`, "_new"),
        },
        {
            id: 2,
            title: "Visualizar",
            icon: <PictureAsPdf color="primary" />,
            onClick: () => window.open(`https://homologacao.focusnfe.com.br${invoice.url_pdf}`, "_new"),
        },
    ]

    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null)
    const menu_opened = Boolean(menuAnchorEl)

    return (
        <Box sx={{ alignItems: "center", width: "100%" }}>
            <Checkbox inputProps={{ style: { padding: "0" } }} />
            <Box sx={{ alignItems: "center", justifyContent: "space-between", flex: 1, gap: "2vw" }}>
                <Box sx={{ flex: 0.1 }}>
                    <p>{new Date(Number(invoice.emissionDatetime)).toLocaleString("pt-br")}</p>
                </Box>
                <Box sx={{ flex: 0.1, justifyContent: "center" }}>
                    {invoice.serie}/{invoice.numero}
                </Box>
                <Box sx={{ flex: 0.55, justifyContent: "center" }}>
                    <p>{invoice.destinatario.name}</p>
                </Box>
                <Box sx={{ flex: 0.1, color: colors.primary, justifyContent: "center" }}>R$ {invoice.valor_total.toString().replace(".", ",")}</Box>
                <Box sx={{ flex: 0.1, justifyContent: "center" }}>
                    <Tooltip title={invoice.mensagem_sefaz}>
                        <Button
                            variant="contained"
                            color={invoice.status == "erro_autorizacao" ? "error" : "primary"}
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
                <Box sx={{ flex: 0.05, justifyContent: "center" }} onClick={notAuth ? () => {} : (event) => setMenuAnchorEl(event.currentTarget)}>
                    <IconButton disabled={notAuth}>
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
                            <MenuItem sx={{ gap: "0.5vw" }} onClick={action.onClick} key={action.id}>
                                <Icon /> {action.title}
                            </MenuItem>
                        )
                    })}
                </Menu>
            </Box>
        </Box>
    )
}
