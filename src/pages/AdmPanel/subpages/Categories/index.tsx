import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { CategoriesListHeader } from "../../../../components/CategoriesList/CategoriesListHeader"
import { CategoriesList } from "../../../../components/CategoriesList"
import { useIo } from "../../../../hooks/useIo"
import { Header } from "../../../../components/Header"
import { Toolbar } from "../../../../components/Toolbar"
import AddCategoryModal from "./AddCategoryModal"
import { useHeader } from "../../../../hooks/useHeader"

interface CategoriesProps {}

export const Categories: React.FC<CategoriesProps> = ({}) => {
    const header = useHeader()
    const [emptyCategoriesList, setEmptyCategoriesList] = useState(false)
    const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false)
    const openCategoryModal = () => {
        setAddCategoryModalOpen(true)
    }
    const io = useIo()
    useEffect(() => {
        header.setTitle("Categorias")
        io.emit("category:list")
    }, [])

    return (
        <>
            <Header />
            <Toolbar searchPlaceholder="categoria" addButtonPlaceholder="" addButtonCallback={openCategoryModal} />
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                }}
            >
                {emptyCategoriesList && (
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
                        <h2>Sem categorias cadastradas</h2>
                        <p>Pressione o botão para cadastrar uma categoria.</p>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "2rem",
                                textTransform: "unset",
                                height: "3rem",
                                verticalAlign: "middle",
                                gap: "0.5rem",
                            }}
                            onClick={openCategoryModal}
                        >
                            <AddOutlinedIcon />
                            Adicionar nova categoria
                        </Button>
                    </Box>
                )}

                {!emptyCategoriesList && (
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
                        <CategoriesListHeader />
                        <CategoriesList />
                    </Box>
                )}
            </Box>
            <AddCategoryModal open={isAddCategoryModalOpen} onClose={() => setAddCategoryModalOpen(false)} />
        </>
    )
}