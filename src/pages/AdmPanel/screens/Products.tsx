import React, { useState } from "react"
import { Box, Button } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"

interface ProductsScreenProps {}

export const ProductsScreen: React.FC<ProductsScreenProps> = ({}) => {
    const [emptyProductsList, setEmptyProductsList] = useState(true)

    return(
        <Box>
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
                        height: "80vh",
                        width: "100%",
                        padding: "2rem"
                    }}
                >
                    <h2>teste</h2>
                </Box>
            }
        </Box>
    )
}