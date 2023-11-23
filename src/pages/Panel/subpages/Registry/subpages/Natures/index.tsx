import React, { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { NaturesListHeader } from "../../../../../../components/NaturesList/NaturesListHeader"
import { NaturesList } from "../../../../../../components/NaturesList"
import { useIo } from "../../../../../../hooks/useIo"
import { Toolbar } from "../../../../../../components/Toolbar"
import AddNatureModal from "./AddNatureModal"
import { useHeader } from "../../../../../../hooks/useHeader"

interface NaturesProps {}

export const Natures: React.FC<NaturesProps> = ({}) => {
    const header = useHeader()
    const [emptyNaturesList, setEmptyNaturesList] = useState(false)
    const [isAddNatureModalOpen, setAddNatureModalOpen] = useState(false)
    const openNatureModal = () => {
        setAddNatureModalOpen(true)
    }
    const io = useIo()
    useEffect(() => {
        header.setTitle("Cadastros gerais - Naturezas de operação")
        io.emit("nature:list")
    }, [])

    return (
        <>
            <Toolbar searchPlaceholder="naturezas de operação" addButtonPlaceholder="natureza de operação" addButtonCallback={openNatureModal} />
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                }}
            >
                {emptyNaturesList && (
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
                            onClick={openNatureModal}
                        >
                            <AddOutlinedIcon />
                            Adicionar nova natureza de operação
                        </Button>
                    </Box>
                )}

                {!emptyNaturesList && (
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
                        <NaturesListHeader />
                        <NaturesList />
                    </Box>
                )}
            </Box>
            <AddNatureModal open={isAddNatureModalOpen} onClose={() => setAddNatureModalOpen(false)} />
        </>
    )
}
