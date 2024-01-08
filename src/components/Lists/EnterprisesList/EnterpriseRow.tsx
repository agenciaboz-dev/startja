import React from "react"
import { Box, Checkbox, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"

interface EnterpriseRowProps {
    enterprise: Company
}

export const EnterpriseRow: React.FC<EnterpriseRowProps> = ({ enterprise }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

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
                    alignItems: "center",
                    justifyContent: "space-between",
                    flex: 1,
                    gap: isMobile ? "20vw" : "2vw",
                }}
            >
                <Box
                    sx={{
                        flex: 0.2,
                    }}
                >
                    {enterprise.name}
                </Box>
                <Box
                    sx={{
                        flex: 0.2,
                        justifyContent: "center",
                    }}
                >
                    {enterprise.document}
                </Box>
                <Box
                    sx={{
                        flex: 0.2,
                        justifyContent: "center",
                    }}
                >
                    {enterprise.type}
                </Box>
                <Box
                    sx={{
                        flex: 0.2,
                        justifyContent: "center",
                    }}
                >
                    {enterprise.city} / {enterprise.state}
                </Box>
                <Box
                    sx={{
                        flex: 0.15,
                        justifyContent: "center",
                    }}
                >
                    {enterprise.phone}
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
