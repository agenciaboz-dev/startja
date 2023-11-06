import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { OperationsListHeader } from "../../../components/OperationsList/OperationsListHeader"
import { OperationsList } from "../../../components/OperationsList"
import { useIo } from "../../../hooks/useIo"

interface OperationsProps {}

export const Operations: React.FC<OperationsProps> = ({}) => {
    const [emptyOperationsList, setEmptyOperationsList] = useState(false)
    const io = useIo()
    useEffect(() => {
        io.emit('operation:list')
    },[])

    return(
        <Box
            sx={{
                height: "100%",
                width: "100%",
            }}
        >
            {emptyOperationsList &&
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
                        Sem naturezas de operação cadastradas
                    </h2>
                    <p>Pressione o botão para cadastrar uma natureza de operação.</p>
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
                        Adicionar nova natureza de operação
                    </Button>
                </Box>
            }

            {!emptyOperationsList &&
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
                    <OperationsListHeader />
                    <OperationsList />
                </Box>
            }
        </Box>
    )
}