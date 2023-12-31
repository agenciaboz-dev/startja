import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"

interface AccountsListHeaderProps {}

export const AccountsListHeader: React.FC<AccountsListHeaderProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "1vw",
                }}
            >
                <Checkbox
                    inputProps={{
                        style: {
                            padding: "0",
                        },
                    }}
                />
                <Box
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        flex: 1,
                        gap: isMobile ? "20vw" : "2vw",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >
                        <h3>Nome</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Agência</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Número da conta</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Banco</h3>
                    </Box>
                    <Box
                        sx={{
                            width: "5%",
                            justifyContent: "center",
                        }}
                    >
                        <h3>Ações</h3>
                    </Box>
                </Box>
            </Box>
            <hr
                style={{
                    marginLeft: "1vw",
                    width: "100%",
                }}
            />
        </Box>
    )
}
