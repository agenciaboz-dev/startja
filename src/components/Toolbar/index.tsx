import React from "react"
import { Box, Button, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"

interface ToolbarProps {
    searchPlaceholder: string
    addButtonPlaceholder: string
    hasFilter?: boolean
    hasAddButton: boolean
}

export const Toolbar: React.FC<ToolbarProps> = ({searchPlaceholder, addButtonPlaceholder, hasFilter, hasAddButton}) => {
    return (
        <Box
            sx={{
                justifyContent: "space-between",
                alignItems: "center",
                height: "3rem",
                gap: "1rem"
            }}
            >
            <TextField
                placeholder={"Buscar " + searchPlaceholder}
                InputProps={{
                    startAdornment: <SearchIcon />,
                    sx: {
                        borderRadius: "4rem",
                        alignItems: "center",
                        height: "100%",
                        gap: "0.5rem"
                    }
                }}
                inputProps={{
                    style: {
                        padding: "4px 0 0 "
                    }
                }}
                sx={{
                    backgroundColor: "white",
                    flex: 1,
                    borderRadius: "4rem",
                    boxShadow: "0 2px 2px 0 #d1d1d1",
                    height: "100%"
                }}
            />
            {hasAddButton &&
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: "2rem",
                        textTransform: "unset",
                        height: "100%",
                        gap: "0.5rem"
                    }}
                >
                    <AddOutlinedIcon />
                    <p>
                        Adicionar {addButtonPlaceholder}
                    </p>
                </Button>
            }
        </Box>
    )
}