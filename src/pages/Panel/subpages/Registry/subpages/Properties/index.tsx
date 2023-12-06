import React, { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { PropertiesListHeader } from "../../../../../../components/PropertiesList/PropertiesListHeader"
import { PropertiesList } from "../../../../../../components/PropertiesList"
import { useIo } from "../../../../../../hooks/useIo"
import { Toolbar } from "../../../../../../components/Toolbar"
import AddPropertyModal from "./AddPropertyModal"
import { useHeader } from "../../../../../../hooks/useHeader"

interface PropertiesProps {}

export const Properties: React.FC<PropertiesProps> = ({}) => {
    const header = useHeader()
    const io = useIo()
    const [emptyPropertiesList, setEmptyPropertiesList] = useState(false)
    const [isAddPropertyModalOpen, setAddPropertyModalOpen] = useState(false)
    const openPropertyModal = () => {
        setAddPropertyModalOpen(true)
    }

    const handleSearch = (text: string) => {}

    useEffect(() => {
        header.setTitle("Cadastros gerais - Propriedades")
        // io.emit("property:list")
    }, [])

    return (
        <>
            <Toolbar
                searchPlaceholder="propriedades"
                onSearch={handleSearch}
                addButtonText="Adicionar propriedade"
                addButtonCallback={openPropertyModal}
            />
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                }}
            >
                {emptyPropertiesList && (
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
                        <h2>Sem naturezas de operação cadastradas</h2>
                        <p>Pressione o botão para cadastrar uma natureza de operação.</p>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "2vw",
                                textTransform: "unset",
                                height: "3vw",
                                verticalAlign: "middle",
                                gap: "0.5vw",
                            }}
                            onClick={openPropertyModal}
                        >
                            <AddOutlinedIcon />
                            Adicionar nova natureza de operação
                        </Button>
                    </Box>
                )}

                {!emptyPropertiesList && (
                    <Box
                        sx={{
                            flex: 1,
                            padding: "1vw 1.5vw 1vw 0.5vw",
                            boxShadow: "0 2px 2px 2px #d1d1d1",
                            backgroundColor: "white",
                            borderRadius: "15px",
                            flexDirection: "column",
                            width: "100%",
                        }}
                    >
                        <PropertiesListHeader />
                        <PropertiesList />
                    </Box>
                )}
            </Box>
            <AddPropertyModal open={isAddPropertyModalOpen} onClose={() => setAddPropertyModalOpen(false)} />
        </>
    )
}
