import React, { useEffect } from "react"
import { Box, Checkbox, CircularProgress, IconButton, Menu, MenuItem, darken, useMediaQuery } from "@mui/material"
//import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { DeleteForever, Edit, RemoveRedEye, ThumbsUpDown } from "@mui/icons-material"
import { colors } from "../../../style/colors"
import { useProduct } from "../../../hooks/useProduct"
import { useIo } from "../../../hooks/useIo"
import { useUser } from "../../../hooks/useUser"
import { useConfirmDialog } from "burgos-confirm"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { ToggleSwitch } from "../../ToggleSwitch"

interface ProductRowProps {
    product: Product
    editProduct: (product: Product) => void
    disabled?: boolean
}

export const ProductRow: React.FC<ProductRowProps> = ({ product, editProduct, disabled }) => {
    const io = useIo()
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { user } = useUser()
    const { confirm } = useConfirmDialog()

    const { isPresentOnInvoice, addProduct } = useProduct()
    const can_delete = product.user_id == user?.id ? !isPresentOnInvoice(product) : false

    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null)
    const menu_opened = Boolean(menuAnchorEl)

    const [deleting, setDeleting] = React.useState(false)

    const block_editing = product ? (product.user_id ? false : !!user) : false

    const actions = product.active
        ? [
              {
                  id: 1,
                  title: block_editing ? "Visualizar" : "Editar",
                  icon: block_editing ? <RemoveRedEye /> : <Edit />,
                  onClick: () => {
                      editProduct(product)
                      setMenuAnchorEl(null)
                  },
              },
          ]
        : [
              {
                  id: 1,
                  title: "Habilitar",
                  icon: <ThumbsUpDown />,
                  onClick: () => {
                      io.emit("product:enable", product.id)
                  },
              },
          ]

    if (!block_editing && product.active) {
        actions.push({
            id: 2,
            title: can_delete ? "Remover" : "Desabilitar",
            icon: deleting ? <CircularProgress size="1.4rem" color="warning" /> : can_delete ? <DeleteForever /> : <RemoveCircleOutlineIcon />,
            onClick: () => {
                if (deleting) return

                if (can_delete) {
                    confirm({
                        title: "deletar produto",
                        content: "certeza que deseja deletar?",
                        onConfirm: () => {
                            setDeleting(true)
                            io.emit("product:delete", product.id)
                        },
                    })
                } else {
                    setDeleting(true)
                    io.emit("product:disable", product.id)
                }
            },
        })
    }

    const handleUserToggle = () => {
        console.log("user toggle")
        io.emit("product:usertoggle", product.id, user?.id)
    }

    const handleToggle = () => {
        console.log("admin toggle")
        io.emit("product:toggle", product.id)
    }

    useEffect(() => {
        io.on("product:toggle:success", (product: Product) => {
            addProduct(product)
        })

        io.on("product:usertoggle", (product: Product) => {
            addProduct(product)
        })

        return () => {
            io.off("product:toggle:success")
            io.off("product:usertoggle")
        }
    }, [])

    // useEffect(() => {
    //     io.on("product:delete:success", (product: Product) => {
    //         setDeleting(false)
    //     })

    //     return () => {
    //         io.off("product:delete:success")
    //     }
    // }, [])

    return (
        <Box
            sx={{
                alignItems: "center",
                width: "100%",
                bgcolor: disabled ? darken(colors.background2, 0.1) : "",
                ":hover": {
                    backgroundColor: colors.background2,
                },
                color: !product.user_id ? "blue" : "",
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
                        flex: 0.05,
                        minWidth: isMobile ? "25vw" : "",
                        justifyContent: "center",
                    }}
                >
                    <p>{product.codigo_externo}</p>
                </Box>
                <Box
                    sx={{
                        flex: 0.4,
                        minWidth: isMobile ? "25vw" : "",
                    }}
                >
                    <p>{product.name}</p>
                </Box>
                <Box
                    sx={{
                        flex: 0.4,
                        minWidth: isMobile ? "25vw" : "",
                    }}
                >
                    <p>{product.ncm}</p>
                </Box>
                <Box
                    sx={{
                        flex: 0.4,
                        minWidth: isMobile ? "25vw" : "",
                    }}
                >
                    {user ? (
                        product.user_id ? (
                            <IconButton color="inherit" onClick={() => editProduct(product)}>
                                <EditOutlinedIcon />
                            </IconButton>
                        ) : (
                            <IconButton color="inherit" onClick={() => editProduct(product)}>
                                <RemoveRedEye />
                            </IconButton>
                        )
                    ) : (
                        <IconButton color="inherit" onClick={() => editProduct(product)}>
                            <EditOutlinedIcon />
                        </IconButton>
                    )}

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
                <Box>
                    <ToggleSwitch
                        checked={
                            user
                                ? product.user_id
                                    ? product.active
                                    : !product.hidden_by.split(",").includes(user?.id.toString() || "a")
                                : product.active
                        }
                        onClick={user ? (product.user_id ? handleToggle : handleUserToggle) : handleToggle}
                    />
                </Box>
            </Box>
        </Box>
    )
}
