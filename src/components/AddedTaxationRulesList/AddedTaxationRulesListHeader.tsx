import React from "react"
import { Box, Checkbox } from "@mui/material"

interface AddedTaxationRulesListHeaderProps {}

export const AddedTaxationRulesListHeader: React.FC<AddedTaxationRulesListHeaderProps> = ({}) => {

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
                    marginBottom: "1vw",
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
                    }}
                >
                    <Box
                        sx={{
                            alignItems: "center",
                            width: "10%",
                        }}
                    >
                        <h3>Destino</h3>
                    </Box>
                    <Box
                        sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "10%",
                        }}
                    >
                        <h3>NCM</h3>
                    </Box>
                    <Box
                        sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "25%",
                        }}
                    >
                        <h3>Produto</h3>
                    </Box>
                    <Box
                        sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "25%",
                        }}
                    >
                        <h3>CFOP</h3>
                    </Box>
                    <Box
                        sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "20%",
                        }}
                    >
                        <h3>Situação tributária</h3>
                    </Box>
                    <Box
                        sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "5%",
                        }}
                    >
                        <h3>Ações</h3>
                    </Box>
                </Box>
            </Box>
            <hr
                style={{
                    marginLeft: "1vw",
                    width: "100%",
                }}
            />
        </Box>
    )
}