import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { NaturesListHeader } from "../../../../components/NaturesList/NaturesListHeader"
import { NaturesList } from "../../../../components/NaturesList"
import { useIo } from "../../../../hooks/useIo"
import { Header } from "../../../../components/Header"
import { Toolbar } from "../../../../components/Toolbar"
import AddNatureModal from "./AddNatureModal"
import { useHeader } from "../../../../hooks/useHeader"
import { useNature } from "../../../../hooks/useNature"
import normalize from "../../../../tools/normalize"

interface NaturesProps {}

export const Natures: React.FC<NaturesProps> = ({}) => {
    // const [emptyNaturesList, setEmptyNaturesList] = useState(false)
    const natures = useNature()
    const header = useHeader()
    const io = useIo()
    const emptyNaturesList = !natures.list.length
    const [isAddNatureModalOpen, setAddNatureModalOpen] = useState(false)
    const openNatureModal = () => {
        setAddNatureModalOpen(true)
    }

    const [naturesList, setNaturesList] = useState(natures.list)

    useEffect(() => {
        setNaturesList(natures.list)
    }, [natures.list])

    const handleSearch = (text: string) => {
        setNaturesList(natures.list.filter((item) => normalize(item.motive).includes(text)))
    }

    useEffect(() => {
        header.setTitle("Naturezas de operação")
        io.emit("nature:list")
    }, [])

    return (
        <>
            <Header />
            <Toolbar
                searchPlaceholder="natureza de operação"
                onSearch={handleSearch}
                addButtonPlaceholder="natureza de operação"
                addButtonCallback={openNatureModal}
            />
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
                            padding: "1vw 1.5vw 1vw 0.5vw",
                            boxShadow: "0 2px 2px 2px #d1d1d1",
                            backgroundColor: "white",
                            borderRadius: "30px",
                            flexDirection: "column",
                            width: "100%",
                        }}
                    >
                        <NaturesListHeader />
                        <NaturesList natures={naturesList} />
                    </Box>
                )}
            </Box>
            <AddNatureModal open={isAddNatureModalOpen} onClose={() => setAddNatureModalOpen(false)} />
        </>
    )
}
