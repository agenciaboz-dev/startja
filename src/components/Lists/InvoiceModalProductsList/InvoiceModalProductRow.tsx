import React from "react"
import { Box, Checkbox, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { FormikErrors } from "formik"

interface InvoiceModalProductRowProps {
    product: InvoiceProduct
    products: InvoiceProduct[]
    updateList: (list: InvoiceProduct[]) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
}

export const InvoiceModalProductRow: React.FC<InvoiceModalProductRowProps> = ({ product, products, updateList }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const slotStyle = {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    }

    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null)
    const menu_opened = Boolean(menuAnchorEl)

    const actions = [
        {
            id: 1,
            title: "Remover",
            icon: <RemoveCircleOutlineIcon />,
            onClick: () => {
                updateList(products.filter((item) => item.id != product.id))
            }
        }
    ]

    return (
        <Box
            sx={{
                alignItems: "center",
                width: "100%"
            }}>
            <Checkbox
                inputProps={{
                    style: {
                        padding: "0"
                    }
                }}
            />
            <Box
                sx={{
                    justifyContent: "space-between",
                    flex: 1
                }}>
                <Box sx={{ ...slotStyle, justifyContent: "start" }}>{product.name}</Box>
                <Box sx={slotStyle}>{product.quantidade}</Box>
                <Box sx={slotStyle}>{product.valor_unitario_comercial}</Box>
                <Box sx={slotStyle}>{}</Box>
                <Box sx={slotStyle}>{product.valor_unitario_comercial * product.quantidade}</Box>
                <Box sx={slotStyle}></Box>
                <IconButton sx={{ ...slotStyle, flex: 0.1, cursor: "pointer" }} onClick={(event) => setMenuAnchorEl(event.currentTarget)}>
                    <FormatListBulletedOutlinedIcon />
                </IconButton>
                <Menu
                    anchorEl={menuAnchorEl}
                    open={menu_opened}
                    onClose={() => setMenuAnchorEl(null)}
                    slotProps={{ paper: { elevation: 3 } }}
                    MenuListProps={{ sx: { width: "100%" } }}>
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
