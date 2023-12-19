import React, { useEffect, useState } from "react"
import { Box, Button, useMediaQuery } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { useIo } from "../../../../../../hooks/useIo"
import { Toolbar } from "../../../../../../components/Toolbar"
import AddAccountModal from "../../../../../../components/Modals/AddAccountModal"
import { useHeader } from "../../../../../../hooks/useHeader"
import { AccountsListHeader } from "../../../../../../components/Lists/AccountsList/AccountsListHeader"
import { AccountsList } from "../../../../../../components/Lists/AccountsList"

interface AccountsProps {}

export const Accounts: React.FC<AccountsProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
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
        <Box
            sx={{
                flexDirection: "column",
                gap: isMobile ? "5vw" : "1vw",
                flex: 1,
            }}
        >
            <Toolbar searchPlaceholder="contas" onSearch={handleSearch} addButtonText="Adicionar conta" addButtonCallback={openAccountModal} />
            <Box
                sx={{
                    flex: 1,
                    overflow: isMobile ? "scroll" : "",
                    padding: isMobile ? "1vw 5vw" : "",
                    margin: isMobile ? "0 -5vw" : "",
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
                                borderRadius: "20px",
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
                            boxShadow: "0 2px 2px 2px #d1d1d1",
                            backgroundColor: "white",
                            borderRadius: "20px",
                            flexDirection: "column",
                            padding: isMobile ? "5vw" : "1vw 1.5vw 1vw 0.5vw",
                            width: isMobile ? "fit-content" : "100%",
                        }}
                    >
                        <AccountsListHeader />
                        <AccountsList />
                    </Box>
                )}
            </Box>
            <AddAccountModal open={isAddAccountModalOpen} onClose={() => setAddAccountModalOpen(false)} />
        </Box>
    )
}
