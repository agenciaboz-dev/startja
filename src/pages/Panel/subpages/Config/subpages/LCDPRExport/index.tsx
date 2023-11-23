import React, { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
// import { AccountsListHeader } from "../../../../../../components/AccountsList/AccountsListHeader"
// import { AccountsList } from "../../../../../../components/AccountsList"
import { useIo } from "../../../../../../hooks/useIo"
import { Toolbar } from "../../../../../../components/Toolbar"
import AddAccountModal from "./AddAccountModal"
import { useHeader } from "../../../../../../hooks/useHeader"
import { AccountsListHeader } from "../../../../../../components/AccountsList/AccountsListHeader"
import { AccountsList } from "../../../../../../components/AccountsList"

interface AccountsProps {}

export const Accounts: React.FC<AccountsProps> = ({}) => {
    const header = useHeader()
    const [emptyAccountsList, setEmptyAccountsList] = useState(false)
    const [isAddAccountModalOpen, setAddAccountModalOpen] = useState(false)
    const openAccountModal = () => {
        setAddAccountModalOpen(true)
    }
    const io = useIo()
    useEffect(() => {
        header.setTitle("Cadastros gerais - Contas")
        // io.emit("account:list")
    }, [])

    return (
        <>
            <Toolbar searchPlaceholder="contas" addButtonPlaceholder="conta" addButtonCallback={openAccountModal} />
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                }}
            >
                {emptyAccountsList && (
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
                        <h2>Sem contas cadastradas</h2>
                        <p>Pressione o botão para cadastrar uma conta.</p>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "2rem",
                                textTransform: "unset",
                                height: "3rem",
                                verticalAlign: "middle",
                                gap: "0.5rem",
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
                            padding: "1rem 1.5rem 1rem 0.5rem",
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
        </>
    )
}
