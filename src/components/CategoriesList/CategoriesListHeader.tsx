import React from "react"
import { Box, Checkbox } from "@mui/material"

interface CategoriesListHeaderProps {}

export const CategoriesListHeader: React.FC<CategoriesListHeaderProps> = ({}) => {

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
            }}    
        >
            <Box
                sx={{
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "1rem"
                }}
                >
                <Checkbox
                    inputProps={{
                        style: {
                            padding: "0"
                        }
                    }}
                />
                <Box
                    sx={{
                        justifyContent: "space-between",
                        flex: 1,
                    }}
                >
                    <Box
                    sx={{
                        width: "45%"
                    }}
                    >
                        <h3>Categoria</h3>
                    </Box>
                    <Box
                    sx={{
                        width: "45%"
                    }}
                    >
                        <h3>Classificação</h3>
                    </Box>
                    <Box
                    sx={{
                        width: "10%",
                        justifyContent: "end"
                    }}
                    >
                        <h3>Ações</h3>
                    </Box>
                </Box>
            </Box>
            <hr
                style={{
                    marginLeft: "1rem",
                    width: "100%"
                }}
            />
        </Box>
    )
}