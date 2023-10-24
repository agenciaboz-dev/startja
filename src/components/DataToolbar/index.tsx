import React from "react"
import { Box, Button, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { colors } from "../../style/colors"

interface DataToolbarProps {}

export const DataToolbar: React.FC<DataToolbarProps> = ({}) => {
    return (
        <Box
            sx={{
                padding: "2rem",
                justifyContent: "space-between",
                alignItems: "center",
                height: "7rem",
                gap: "1rem"
            }}
            >
            <TextField
                placeholder="Pesquisar"
                InputProps={{
                    startAdornment: <SearchIcon />,
                    sx: {
                        borderRadius: "4rem",
                        alignItems: "center",
                        height: "100%"
                    }
                }}
                inputProps={{
                    style: {
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
            <Button
                variant="contained"
                sx={{
                    borderRadius: "2rem",
                    textTransform: "capitalize",
                    height: "100%"
                }}
            >
                <AddOutlinedIcon />
                Adicionar
            </Button>
        </Box>
    )
}