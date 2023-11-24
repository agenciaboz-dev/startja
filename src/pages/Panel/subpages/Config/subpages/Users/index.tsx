import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { ProductsListHeader } from "../../../../../../components/ProductsList/ProductsListHeader"
import { ProductsList } from "../../../../../../components/ProductsList"
import { useIo } from "../../../../../../hooks/useIo"
import { Toolbar } from "../../../../../../components/Toolbar"
import { useProduct } from "../../../../../../hooks/useProduct"
import { useHeader } from "../../../../../../hooks/useHeader"

interface ProductsProps {}

export const Products: React.FC<ProductsProps> = ({}) => {
    // const [emptyProductsList, setEmptyProductsList] = useState(true)
    const products = useProduct()
    const header = useHeader()
    const emptyProductsList = !products.list.length

    const io = useIo()
    useEffect(() => {
        header.setTitle("Cadastros gerais - Produtos")
        io.emit("product:list")
    }, [])

    return (
        <>
            <Toolbar searchPlaceholder="produtos" addButtonPlaceholder="produto" addButtonCallback={openProductModal} />
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                }}
            >
                {emptyProductsList && (
                    <Box
                        sx={{
                            height: "80vh",
                            width: "100%",
                            padding: "2rem",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                    >
                        <h2>Sem produtos cadastrados</h2>
                        <p>Pressione o botão para cadastrar um produto.</p>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "2rem",
                                textTransform: "unset",
                                height: "3rem",
                                verticalAlign: "middle",
                                gap: "0.5rem",
                            }}
                            onClick={openProductModal}
                        >
                            <AddOutlinedIcon />
                            Adicionar produto
                        </Button>
                    </Box>
                )}

                {!emptyProductsList && (
                    <Box
                        sx={{
                            flex: 1,
                            padding: "1rem 1.5rem 1rem 0.5rem",
                            boxShadow: "0 2px 2px 2px #d1d1d1",
                            backgroundColor: "white",
                            borderRadius: "30px",
                            flexDirection: "column",
                            width: "100%",
                        }}
                    >
                        <ProductsListHeader />
                        <ProductsList />
                    </Box>
                )}
            </Box>
        </>
    )
}