import React from "react"
import { Box, Checkbox, IconButton, Menu, MenuItem } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"

interface InvoiceModalProductRowProps {
    product: InvoiceProduct
}

export const InvoiceModalProductRow: React.FC<InvoiceModalProductRowProps> = ({ product }) => {
    const slotStyle = {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    }

    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null)
    const menu_opened = Boolean(menuAnchorEl)

    const actions = [
        {
            id: 1,
            title: "Remover",
            icon: <RemoveCircleOutlineIcon />,
            onClick: () => {},
        },
    ]

    return (
        <Box
            sx={{
                alignItems: "center",
                width: "100%",
            }}
        >
            <Checkbox
                inputProps={{
                    style: {
                        padding: "0",
                    },
                }}
            />
            <Box
                sx={{
                    justifyContent: "space-between",
                    flex: 1,
                }}
            >
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
                    MenuListProps={{ sx: { width: "100%" } }}
                >
                    {actions.map((action) => {
                        const Icon = () => action.icon
                        return (
                            <MenuItem sx={{ gap: "1vw" }} onClick={action.onClick} key={action.id}>
                                <Icon /> {action.title}
                            </MenuItem>
                        )
                    })}
                </Menu>
            </Box>
        </Box>
    )
}
