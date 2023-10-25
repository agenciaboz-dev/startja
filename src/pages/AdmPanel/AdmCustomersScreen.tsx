import React, { useState } from "react"
import { Box, Button } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"

interface AdmCustomersScreenProps {}

export const AdmCustomersScreen: React.FC<AdmCustomersScreenProps> = ({}) => {
    const [emptyCustomersList, setEmptyCustomersList] = useState(false)

    return(
        <Box>
            {emptyCustomersList &&
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
                        Sem clientes cadastrados
                    </h2>
                    <p>Para facilitar a inclusão de clientes no sistema, pressione o botão para cadastrar um novo cliente.</p>
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
                        Adicionar novo cliente
                    </Button>
                </Box>
            }

            {!emptyCustomersList &&
                <Box
                    sx={{
                        height: "80vh",
                        width: "100%",
                        padding: "2rem"
                    }}
                >
                    <h2>teste</h2>
                </Box>
            }
        </Box>
    )
}