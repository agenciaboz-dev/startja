import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { OperationsListHeader } from "../../../../components/OperationsList/OperationsListHeader"
import { OperationsList } from "../../../../components/OperationsList"
import { useIo } from "../../../../hooks/useIo"
import { Header } from "../../../../components/Header"
import { Toolbar } from "../../../../components/Toolbar"
import AddNewOperationModal from "./AddNewOperationModal"
import { useHeader } from "../../../../hooks/useHeader"

interface OperationsProps {}

export const Operations: React.FC<OperationsProps> = ({}) => {
    const header = useHeader()
    const [emptyOperationsList, setEmptyOperationsList] = useState(false)
    const [isAddNewOperationModalOpen, setAddNewOperationModalOpen] = useState(false)
    const openNewOperationModal = () => {
        setAddNewOperationModalOpen(true)
    }
    const io = useIo()
    useEffect(() => {
        header.setTitle("Natureza da operação")
        io.emit("operation:list")
    }, [])

    return (
        <>
            <Header />
            <Toolbar searchPlaceholder="natureza da operação" addButtonPlaceholder="natureza da operação" addButtonCallback={openNewOperationModal} />
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                }}
            >
                {emptyOperationsList && (
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
                            onClick={openNewOperationModal}
                        >
                            <AddOutlinedIcon />
                            Adicionar nova natureza de operação
                        </Button>
                    </Box>
                )}

                {!emptyOperationsList && (
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
                        <OperationsListHeader />
                        <OperationsList />
                    </Box>
                )}
            </Box>
            <AddNewOperationModal open={isAddNewOperationModalOpen} onClose={() => setAddNewOperationModalOpen(false)} />
        </>
    )
}