import React, { useState } from "react"
import { Box, Button, Checkbox } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"

interface ProductsScreenProps {}

export const ProductsScreen: React.FC<ProductsScreenProps> = ({}) => {
    const [emptyProductsList, setEmptyProductsList] = useState(false)

    return(
        <Box
            sx={{
                height: "100%",
                width: "100%",
            }}
        >
            {emptyProductsList &&
                <Box
                    sx={{
                        height: "80vh",
                        width: "100%",
                        padding: "2rem",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "1rem"
                    }}
                >
                    <h2>
                        Sem produtos cadastrados
                    </h2>
                    <p>Para facilitar a inclusão de produtos no sistema, pressione o botão para cadastrar um novo produto.</p>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: "2rem",
                            textTransform: "capitalize",
                            height: "3rem",
                            verticalAlign: "middle",
                            gap: "0.5rem"
                        }}
                    >
                        <AddOutlinedIcon />
                        Adicionar novo produto
                    </Button>
                </Box>
            }

            {!emptyProductsList &&
                <Box
                    sx={{
                        flex: 1,
                        padding: "1rem 1.5rem 1rem 0.5rem",
                        boxShadow: "0 2px 2px 2px #d1d1d1",
                        backgroundColor: "white",
                        borderRadius: "20px",
                        flexDirection: "column",
                        width: "100%"
                    }}
                    >
                    <Box
                        sx={{
                            alignItems: "center",
                            width: "100%"
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
                            <h3>Nome do Produto</h3>
                            <h3>NCM - Classificação</h3>
                            <h3>Ações</h3>
                        </Box>
                    </Box>
                    <hr />

                    <h2>teste</h2>
                    
                </Box>
            }
        </Box>
    )
}