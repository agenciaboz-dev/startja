import React, { useEffect, useState } from "react"
import { Box, Button, MenuItem, TextField, useMediaQuery } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import normalize from "../../tools/normalize"
import { colors } from "../../style/colors"

interface ToolbarProps {
    searchPlaceholder: string
    onSearch: (text: string) => void
    greyBackground?: boolean
    selectList?: any[]
    hasFilterButton?: boolean
    importButtonPlaceholder?: string
    addButtonText?: string
    addButtonCallback?: () => void
}

export const Toolbar: React.FC<ToolbarProps> = ({
    searchPlaceholder,
    onSearch,
    greyBackground,
    selectList,
    hasFilterButton,
    importButtonPlaceholder,
    addButtonText,
    addButtonCallback,
}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        onSearch(normalize(searchValue))
    }, [searchValue])

    return (
        <Box
            sx={{
                justifyContent: "space-between",
                alignItems: "center",
                height: isMobile ? "fit-content" : "2vw",
                width: "100%",
                gap: isMobile ? "4vw" : "1vw",
                flexDirection: isMobile ? "column" : "",
            }}
        >
            <TextField
                placeholder={"Buscar " + searchPlaceholder}
                value={searchValue}
                onChange={(ev) => setSearchValue(ev.target.value)}
                InputProps={{
                    startAdornment: <SearchIcon />,
                    sx: {
                        borderRadius: "15px",
                        alignItems: "center",
                        height: isMobile ? "10vw" : "100%",
                        gap: "0.5vw",
                        backgroundColor: greyBackground ? colors.background : "white",
                    },
                }}
                inputProps={{
                    style: {
                        padding: "5px 0 0",
                    },
                }}
                sx={{
                    backgroundColor: "white",
                    flex: 1,
                    borderRadius: "15px",
                    boxShadow: "0 2px 2px 0 #d1d1d1",
                    height: "100%",
                    width: isMobile ? "100%" : "",
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
                    label="Filtrar"
                    name="toolbarSelect"
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "15px",
                        boxShadow: "0 2px 2px 0 #d1d1d1",
                        height: isMobile ? "10vw" : "100%",
                        width: isMobile ? "100%" : "20vw",
                    }}
                    select
                    size="small"
                    SelectProps={{
                        sx: {
                            height: "100%",
                            borderRadius: "15px",
                            // padding: 0,
                        },
                        style: {
                            // height: "100%",
                            // padding: 0,
                        },
                    }}
                    InputProps={{
                        sx: {
                            // height: "100%",
                            // padding: 0,
                        },
                    }}
                    inputProps={{
                        style: {
                            // height: "100%",
                            // padding: 0,
                        },
                    }}
                    InputLabelProps={{
                        sx: {
                            height: "100%",
                            padding: 0,
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
                        marginLeft: "auto",
                    }}
                    onClick={addButtonCallback}
                >
                    <AddOutlinedIcon />
                    <p>{addButtonText}</p>
                </Button>
            )}
        </Box>
    )
}
