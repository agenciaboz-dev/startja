import React, { useEffect } from "react"
import { Box, Checkbox, CircularProgress, IconButton, Menu, MenuItem, darken, useMediaQuery } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { DeleteForever, Edit } from "@mui/icons-material"
import { colors } from "../../../style/colors"
import { useInvoice } from "../../../hooks/useInvoice"
import { useIo } from "../../../hooks/useIo"

interface PropertyRowProps {
    property: Property
    editProperty: (property: Property) => void
}

export const PropertyRow: React.FC<PropertyRowProps> = ({ property, editProperty }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()

    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null)
    const menu_opened = Boolean(menuAnchorEl)
    const invoices = useInvoice()

    const is_present_on_invoices = !!invoices.list.find((invoice) => invoice.propriedade_id == property.id)
    const [deleting, setDeleting] = React.useState(false)

    const actions = [
        {
            id: 1,
            title: "Editar",
            icon: <Edit />,
            onClick: () => {
                editProperty(property)
                setMenuAnchorEl(null)
            },
        },
        {
            id: 2,
            title: is_present_on_invoices ? "Desabilitar" : "Remover",
            icon: deleting ? (
                <CircularProgress size="1.4rem" color="warning" />
            ) : !is_present_on_invoices ? (
                <DeleteForever />
            ) : (
                <RemoveCircleOutlineIcon />
            ),
            onClick: () => {
                if (deleting) return
                setDeleting(true)
                io.emit(is_present_on_invoices ? "property:disable" : "property:delete", property.id)
            },
        },
    ]

    useEffect(() => {
        io.on("property:disable:success", () => {
            setDeleting(false)
        })

        io.on("property:disable:error", () => {
            setDeleting(false)
        })

        return () => {
            io.off("property:disable:success")
            io.off("property:disable:error")
        }
    })

    return (
        <Box
            sx={{
                alignItems: "center",
                width: "100%",
                bgcolor: !property.active ? darken(colors.background2, 0.1) : "",
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
                    alignItems: "center",

                    justifyContent: "space-between",
                    flex: 1,
                    gap: isMobile ? "20vw" : "2vw",
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <p>{property.name}</p>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <p>{property.nifr}</p>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <p>{property.ie}</p>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <p>{property.street}</p>
                </Box>
                <Box
                    sx={{
                        width: "5%",
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
