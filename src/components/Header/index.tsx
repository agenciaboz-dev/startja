import React from "react"
import { Box, Menu, MenuItem, SxProps } from "@mui/material"
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined"
import { useHeader } from "../../hooks/useHeader"
import { useMenus } from "../../hooks/useMenus"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    const { title } = useHeader()
    const menus = useMenus()

    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null)
    const menu_opened = Boolean(menuAnchorEl)

    return (
        <Box
            sx={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%"
            }}>
            <h1>{title}</h1>
            <Box
                sx={{
                    gap: "2rem",
                    alignItems: "center"
                }}>
                <Box
                    sx={{
                        alignItems: "center",
                        gap: "0.5rem"
                    }}>
                    <HelpOutlineOutlinedIcon
                        sx={{
                            fill: "#323232",
                            height: "2rem",
                            width: "2rem"
                        }}
                    />
                    <p
                        style={{
                            fontWeight: "lighter"
                        }}>
                        Ajuda
                    </p>
                </Box>
                <hr
                    style={{
                        height: "2rem"
                    }}
                />
                <MenuItem sx={{ alignItems: "center", gap: "0.5rem", width: "15vw" }} onClick={(event) => setMenuAnchorEl(event.currentTarget)}>
                    <AccountCircleOutlinedIcon
                        sx={{
                            fill: "#323232",
                            height: "2rem",
                            width: "2rem"
                        }}
                    />
                    <Box
                        sx={{
                            flexDirection: "column"
                        }}>
                        <p
                            style={{
                                fontWeight: "lighter"
                            }}>
                            [Nome do Usuário]
                        </p>
                        <p
                            style={{
                                fontSize: "0.8rem",
                                fontWeight: "bold"
                            }}>
                            Menus e configurações
                        </p>
                    </Box>
                    <ArrowDropDownOutlinedIcon />
                </MenuItem>
                <Menu
                    anchorEl={menuAnchorEl}
                    open={menu_opened}
                    onClose={() => setMenuAnchorEl(null)}
                    slotProps={{ paper: { sx: { width: "15vw" }, elevation: 2 } }}
                    MenuListProps={{ sx: { width: "100%" } }}>
                    {menus.list.map((menu) => {
                        const Icon = () => menu.icon
                        return (
                            <MenuItem sx={{ gap: "1vw" }} onClick={menu.onClick}>
                                <Icon /> {menu.title}
                            </MenuItem>
                        )
                    })}
                </Menu>
            </Box>
        </Box>
    )
}