import React, { useEffect, useState } from "react"
import { Box, Button, MenuItem, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import normalize from "../../tools/normalize"

interface ToolbarProps {
    searchPlaceholder: string
    onSearch: (text: string) => void

    selectList?: any[]
    hasFilterButton?: boolean
    importButtonPlaceholder?: string
    addButtonPlaceholder?: string
    addButtonCallback?: () => void
}

export const Toolbar: React.FC<ToolbarProps> = ({
    searchPlaceholder,
    selectList,
    hasFilterButton,
    importButtonPlaceholder,
    addButtonPlaceholder,
    addButtonCallback,
    onSearch
}) => {
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        onSearch(normalize(searchValue))
    }, [searchValue])

    return (
        <Box
            sx={{
                justifyContent: "space-between",
                alignItems: "center",
                height: "3vw",
                width: "100%",
                gap: "1vw",
            }}
        >
            <TextField
                placeholder={"Buscar " + searchPlaceholder}
                value={searchValue}
                onChange={(ev) => setSearchValue(ev.target.value)}
                InputProps={{
                    startAdornment: <SearchIcon />,
                    sx: {
                        borderRadius: "30px",
                        alignItems: "center",
                        height: "100%",
                        gap: "0.5vw",
                    },
                }}
                inputProps={{
                    style: {
                        // padding: "4px 0 0"
                    },
                }}
                sx={{
                    backgroundColor: "white",
                    flex: 1,
                    borderRadius: "30px",
                    boxShadow: "0 2px 2px 0 #d1d1d1",
                    height: "100%",
                }}
            />
            {/* {!!filterButtonCallback && */}
            {hasFilterButton && (
                <Button
                    variant="outlined"
                    sx={{
                        borderRadius: "2vw",
                        textTransform: "unset",
                        height: "100%",
                        gap: "0.5vw",
                    }}
                    // onClick={filterButtonCallback}
                >
                    <AddOutlinedIcon />
                    <p>Filtrar</p>
                </Button>
            )}
            {/* {!!importButtonCallback && */}
            {importButtonPlaceholder && (
                <Button
                    variant="outlined"
                    sx={{
                        borderRadius: "2vw",
                        textTransform: "unset",
                        height: "100%",
                        gap: "0.5vw",
                    }}
                    // onClick={importButtonCallback}
                >
                    <AddOutlinedIcon />
                    <p>Importar {importButtonPlaceholder}</p>
                </Button>
            )}
            {!!selectList && (
                <TextField
                    label="Tudo"
                    name="toolbarSelect"
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "30px",
                        boxShadow: "0 2px 2px 0 #d1d1d1",
                        height: "100%",
                        width: "20vw",
                    }}
                    select
                    SelectProps={{
                        sx: {
                            height: "100%",
                            borderRadius: "30px",
                        },
                    }}
                >
                    {selectList.map((item) => (
                        <MenuItem key={item.id}>{item.name}</MenuItem>
                    ))}
                </TextField>
            )}
            {!!addButtonCallback && (
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: "2vw",
                        textTransform: "unset",
                        height: "100%",
                        gap: "0.5vw",
                    }}
                    onClick={addButtonCallback}
                >
                    <AddOutlinedIcon />
                    <p>Adicionar {addButtonPlaceholder}</p>
                </Button>
            )}
        </Box>
    )
}
