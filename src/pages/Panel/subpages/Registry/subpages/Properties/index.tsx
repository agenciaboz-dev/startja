import React, { useEffect, useState } from "react"
import { Box, Button, useMediaQuery } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { PropertiesListHeader } from "../../../../../../components/Lists/PropertiesList/PropertiesListHeader"
import { PropertiesList } from "../../../../../../components/Lists/PropertiesList"
import { useIo } from "../../../../../../hooks/useIo"
import { Toolbar } from "../../../../../../components/Toolbar"
import AddPropertyModal from "../../../../../../components/Modals/AddPropertyModal"
import { useHeader } from "../../../../../../hooks/useHeader"

interface PropertiesProps {}

export const Properties: React.FC<PropertiesProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
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
        <Box
            sx={{
                flexDirection: "column",
                gap: isMobile ? "5vw" : "1vw",
                flex: 1,
            }}
        >
            <Toolbar
                searchPlaceholder="propriedades"
                onSearch={handleSearch}
                addButtonText="Adicionar propriedade"
                addButtonCallback={openPropertyModal}
            />
            <Box
                sx={{
                    flex: 1,
                    overflow: isMobile ? "scroll" : "",
                    padding: isMobile ? "1vw 5vw" : "",
                    margin: isMobile ? "0 -5vw" : "",
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
                                borderRadius: "20px",
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
                            boxShadow: "0 2px 2px 2px #d1d1d1",
                            backgroundColor: "white",
                            borderRadius: "20px",
                            flexDirection: "column",
                            padding: isMobile ? "5vw" : "1vw 1.5vw 1vw 0.5vw",
                            width: isMobile ? "fit-content" : "100%",
                            gap: isMobile ? "2.5vw" : "",
                        }}
                    >
                        <PropertiesListHeader />
                        <PropertiesList />
                    </Box>
                )}
            </Box>
            <AddPropertyModal open={isAddPropertyModalOpen} onClose={() => setAddPropertyModalOpen(false)} />
        </Box>
    )
}
