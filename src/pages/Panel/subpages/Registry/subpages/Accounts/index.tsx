import React, { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { useIo } from "../../../../../../hooks/useIo"
import { Toolbar } from "../../../../../../components/Toolbar"
import AddAccountModal from "./AddAccountModal"
import { useHeader } from "../../../../../../hooks/useHeader"
import { AccountsListHeader } from "../../../../../../components/AccountsList/AccountsListHeader"
import { AccountsList } from "../../../../../../components/AccountsList"

interface AccountsProps {}

export const Accounts: React.FC<AccountsProps> = ({}) => {
    const header = useHeader()
    const io = useIo()
    const [emptyAccountsList, setEmptyAccountsList] = useState(false)
    const [isAddAccountModalOpen, setAddAccountModalOpen] = useState(false)
    const openAccountModal = () => {
        setAddAccountModalOpen(true)
    }

    const handleSearch = (text: string) => {}

    useEffect(() => {
        header.setTitle("Cadastros gerais - Contas")
        // io.emit("account:list")
    }, [])

    return (
        <>
            <Toolbar searchPlaceholder="contas" onSearch={handleSearch} addButtonPlaceholder="conta" addButtonCallback={openAccountModal} />
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                }}
            >
                {emptyAccountsList && (
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
                        <h2>Sem contas cadastradas</h2>
                        <p>Pressione o botão para cadastrar uma conta.</p>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "2vw",
                                textTransform: "unset",
                                height: "3vw",
                                verticalAlign: "middle",
                                gap: "0.5vw",
                            }}
                            onClick={openAccountModal}
                        >
                            <AddOutlinedIcon />
                            Adicionar nova conta
                        </Button>
                    </Box>
                )}

                {!emptyAccountsList && (
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
                        <AccountsListHeader />
                        <AccountsList />
                    </Box>
                )}
            </Box>
            <AddAccountModal open={isAddAccountModalOpen} onClose={() => setAddAccountModalOpen(false)} />
        </>
    )
}
