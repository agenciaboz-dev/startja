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
    const io = useIo()
    const [emptyCategoriesList, setEmptyCategoriesList] = useState(false)
    const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false)
    const openCategoryModal = () => {
        setAddCategoryModalOpen(true)
    }

    const handleSearch = (text: string) => {
        console.log("Search text:", text)
    }

    useEffect(() => {
        header.setTitle("Categorias")
        io.emit("category:list")
    }, [])

    return (
        <>
            <Header />
            <Toolbar searchPlaceholder="categoria" onSearch={handleSearch} addButtonText="Adicionar" addButtonCallback={openCategoryModal} />
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                }}
            >
                {emptyCategoriesList && (
                    <Box
                        sx={{
                            height: "100%",
                            width: "100%",
                            padding: "2vw",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: "1vw",
                        }}
                    >
                        <h2>Sem categorias cadastradas</h2>
                        <p>Pressione o botão para cadastrar uma categoria.</p>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "2vw",
                                textTransform: "unset",
                                height: "3vw",
                                verticalAlign: "middle",
                                gap: "0.5vw",
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
                            padding: "1vw 1.5vw 1vw 0.5vw",
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