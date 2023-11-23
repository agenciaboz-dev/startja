import React, { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { PropertiesListHeader } from "../../../../../../components/PropertiesList/PropertiesListHeader"
import { PropertiesList } from "../../../../../../components/PropertiesList"
import { useIo } from "../../../../../../hooks/useIo"
import { Toolbar } from "../../../../../../components/Toolbar"
import { useHeader } from "../../../../../../hooks/useHeader"

interface PropertiesProps {}

export const Properties: React.FC<PropertiesProps> = ({}) => {
    const header = useHeader()
    const [emptyPropertiesList, setEmptyPropertiesList] = useState(false)

    const io = useIo()
    useEffect(() => {
        header.setTitle("Cadastros gerais - Propriedades")
        // io.emit("property:list")
    }, [])

    return (
        <>
            <Toolbar searchPlaceholder="propriedades" addButtonPlaceholder="propriedade" addButtonCallback={openPropertyModal} />
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                }}
            >
                {emptyPropertiesList && (
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
                        <h2>Sem naturezas de operação cadastradas</h2>
                        <p>Pressione o botão para cadastrar uma natureza de operação.</p>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "2rem",
                                textTransform: "unset",
                                height: "3rem",
                                verticalAlign: "middle",
                                gap: "0.5rem",
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
                            padding: "1rem 1.5rem 1rem 0.5rem",
                            boxShadow: "0 2px 2px 2px #d1d1d1",
                            backgroundColor: "white",
                            borderRadius: "30px",
                            flexDirection: "column",
                            width: "100%",
                        }}
                    >
                        <PropertiesListHeader />
                        <PropertiesList />
                    </Box>
                )}
            </Box>
        </>
    )
}
