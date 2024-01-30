import React, { useEffect } from "react"
import { Box, Checkbox, CircularProgress, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { DeleteForever, Edit } from "@mui/icons-material"
import { colors } from "../../../style/colors"
import { useProduct } from "../../../hooks/useProduct"
import { useIo } from "../../../hooks/useIo"

interface ProductRowProps {
    product: Product
    editProduct: (product: Product) => void
}

export const ProductRow: React.FC<ProductRowProps> = ({ product, editProduct }) => {
    const io = useIo()
    const isMobile = useMediaQuery("(orientation: portrait)")

    const { isPresentOnInvoice } = useProduct()
    const can_delete = !isPresentOnInvoice(product)

    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null)
    const menu_opened = Boolean(menuAnchorEl)

    const [deleting, setDeleting] = React.useState(false)

    const actions = [
        {
            id: 1,
            title: "Editar",
            icon: <Edit />,
            onClick: () => {
                editProduct(product)
                setMenuAnchorEl(null)
            },
        },
        {
            id: 2,
            title: can_delete ? "Remover" : "Desabilitar",
            icon: deleting ? <CircularProgress size="1.4rem" color="warning" /> : can_delete ? <DeleteForever /> : <RemoveCircleOutlineIcon />,
            onClick: () => {
                if (deleting) return
                setDeleting(true)
                io.emit(can_delete ? "product:delete" : "product:disable", product.id)
            },
        },
    ]

    useEffect(() => {
        io.on("product:delete:success", (product: Product) => {
            setDeleting(false)
        })

        return () => {
            io.off("product:delete:success")
        }
    }, [])

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
                    alignItems: "center",
                    flex: 1,
                    gap: isMobile ? "20vw" : "2vw",
                }}
            >
                <Box
                    sx={{
                        flex: 0.45,
                        minWidth: isMobile ? "25vw" : "",
                    }}
                >
                    <p>{product.name}</p>
                </Box>
                <Box
                    sx={{
                        flex: 0.5,
                        minWidth: isMobile ? "25vw" : "",
                    }}
                >
                    <p>{product.ncm}</p>
                </Box>
                <Box
                    sx={{
                        flex: 0.05,
                        justifyContent: "center",
                    }}
                >
                    <IconButton onClick={(event) => setMenuAnchorEl(event.currentTarget)}>
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
