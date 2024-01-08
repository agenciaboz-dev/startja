import React from "react"
import { Box, Checkbox, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material"
import { ToggleSwitch } from "../../ToggleSwitch"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"

interface CollaboratorRowProps {
    // collaborator: Collaborator
}

export const CollaboratorRow: React.FC<CollaboratorRowProps> = ({ collaborator }) => {
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
                        width: "35%",
                        alignItems: "center",
                    }}
                >
                    {/* <p>{collaborator.name}</p> */}
                    <p>Giana Workman</p>
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        width: "25%",
                        justifyContent: "center",
                    }}
                >
                    <p>cursus@outlook.com.br</p>
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        width: "20%",
                        justifyContent: "center",
                    }}
                >
                    <p>05/08/2022</p>
                </Box>
                <Box
                    sx={{
                        width: "10%",
                        justifyContent: "center",
                    }}
                >
                    <ToggleSwitch />
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
