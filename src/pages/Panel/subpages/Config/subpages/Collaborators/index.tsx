import React, { useEffect, useState } from "react"
import { Box, Button, useMediaQuery } from "@mui/material"
import { useHeader } from "../../../../../../hooks/useHeader"
import { Toolbar } from "../../../../../../components/Toolbar"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { useIo } from "../../../../../../hooks/useIo"
import normalize from "../../../../../../tools/normalize"
import { CollaboratorsListHeader } from "../../../../../../components/CollaboratorsList/CollaboratorsListHeader"
import { CollaboratorRow } from "../../../../../../components/CollaboratorsList/CollaboratorRow"

interface ConfigCollaboratorsProps {
    user: User
}

export const ConfigCollaborators: React.FC<ConfigCollaboratorsProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const header = useHeader()
    const io = useIo()

    // const collaborators = useCollaborator()
    // const emptyCollaboratorsList = !collaborators.list.length
    const [emptyCollaboratorsList, setEmptyCollaboratorsList] = useState(false)

    // const [collaboratorsList, setCollaboratorsList] = useState(collaborators.list)

    // useEffect(() => {
    //     setCollaboratorsList(collaborators.list)
    // }, [collaborators.list])

    // const handleSearch = (text: string) => {
    //     setCollaboratorsList(collaborators.list.filter((item) => normalize(item.motive).includes(text)))
    // }

    useEffect(() => {
        header.setTitle("Configurações")
        // io.emit("collaborator:list")
    }, [])

    return (
        <Box
            sx={{
                flex: 1,
                padding: isMobile ? "5vw" : "1.5vw",
                boxShadow: "0 2px 2px 2px #d1d1d1",
                backgroundColor: "white",
                borderRadius: "20px",
                flexDirection: "column",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    gap: isMobile ? "5vw" : "1vw",
                }}
            >
                {!isMobile && <h2>Usuários</h2>}
                <Toolbar
                    searchPlaceholder="usuários"
                    onSearch={() => {}}
                    addButtonCallback={() => {}}
                    addButtonText="Convidar usuário"
                    greyBackground
                />
            </Box>
            <Box
                sx={{
                    height: "100%",
                    flex: 1,
                    overflow: isMobile ? "scroll" : "",
                    padding: isMobile ? "1vw 5vw" : "",
                    margin: isMobile ? "0 -5vw" : "",
                }}
            >
                {emptyCollaboratorsList && (
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
                        <h2>Sem usuários colaboradores cadastrados</h2>
                        <p>Pressione o botão para cadastrar um usuário colaborador.</p>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "20px",
                                textTransform: "unset",
                                height: "3vw",
                                verticalAlign: "middle",
                                gap: "0.5vw",
                            }}
                        >
                            <AddOutlinedIcon />
                            Adicionar novo usuário colaborador
                        </Button>
                    </Box>
                )}

                {!emptyCollaboratorsList && (
                    <Box
                        sx={{
                            flexDirection: "column",
                            width: isMobile ? "fit-content" : "100%",
                            padding: isMobile ? "5vw 0" : "1vw 0.5vw 0 0",
                            marginLeft: "-0.5vw",
                        }}
                    >
                        <CollaboratorsListHeader />
                        {/* <CollaboratorsList collaborators={collaboratorsList} /> */}
                        <CollaboratorRow />
                    </Box>
                )}
            </Box>
        </Box>
    )
}
