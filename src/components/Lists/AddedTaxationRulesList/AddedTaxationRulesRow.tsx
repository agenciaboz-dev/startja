import React from "react"
import { Box, Checkbox, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"

interface AddedTaxationRuleRowProps {
    // addedTaxationRule : AddedTaxationRule
}

export const AddedTaxationRuleRow: React.FC<AddedTaxationRuleRowProps> = ({ addedTaxationRule }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const cellStyle = {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
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
                    gap: isMobile ? "10vw" : "",
                }}
            >
                <Box
                    sx={{
                        alignItems: "center",
                        flex: 0.1,
                    }}
                >
                    <p>SP</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 0.1,
                    }}
                >
                    <p>00000001</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 0.25,
                    }}
                >
                    <p>SIT FERMENTUM</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 0.2,
                    }}
                >
                    <p>Nulla lacus etiam</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 0.25,
                    }}
                >
                    <p>32 - Morbi</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 0.05,
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