import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { CategoriesListHeader } from "../../../components/CategoriesList/CategoriesListHeader"
import { CategoriesList } from "../../../components/CategoriesList"
import { useIo } from "../../../hooks/useIo"

interface CategoriesProps {}

export const Categories: React.FC<CategoriesProps> = ({}) => {
    const [emptyCategoriesList, setEmptyCategoriesList] = useState(false)
    const io = useIo()
    useEffect(() => {
        io.emit('category:list')
    },[])

    return(
        <Box
            sx={{
                height: "100%",
                width: "100%",
            }}
        >
            {emptyCategoriesList &&
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
                        Sem categorias cadastradas
                    </h2>
                    <p>Pressione o botão para cadastrar uma categoria.</p>
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
                        Adicionar nova categoria
                    </Button>
                </Box>
            }

            {!emptyCategoriesList &&
                <Box
                    sx={{
                        flex: 1,
                        padding: "1rem 1.5rem 1rem 0.5rem",
                        boxShadow: "0 2px 2px 2px #d1d1d1",
                        backgroundColor: "white",
                        borderRadius: "20px",
                        flexDirection: "column",
                        width: "100%",
                    }}
                    >
                    <CategoriesListHeader />
                    <CategoriesList />
                </Box>
            }
        </Box>
    )
}