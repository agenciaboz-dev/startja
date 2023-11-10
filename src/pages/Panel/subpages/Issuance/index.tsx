import React from "react"
import { Box, Button } from "@mui/material"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { colors } from "../../../../style/colors"
import { Sidebar } from "../../../../components/Sidebar"
import { Header } from "../../../../components/Header"
import { Toolbar } from "../../../../components/Toolbar"
import { InvoicesList } from "../../../../components/InvoicesList"
import { ProductsList } from "../../../../components/ProductsList"
import { InvoicesListHeader } from "../../../../components/InvoicesList/InvoicesListHeader"

interface IssuanceProps {
    user: User
}

export const Issuance: React.FC<IssuanceProps> = ({user}) => {
    return (
        <>
            <Header title="Notas fiscais emitidas" />
            <Box
                sx={{
                    height: "80vh",
                    width: "100%"
                }}
            >
                <Box
                    sx={{
                        height: "100%",
                        width: "100%",
                        flexDirection: "column",
                        gap: "2rem"
                    }}
                    >
                    <Toolbar searchPlaceholder="produto" />
                    <Box
                        sx={{
                            height: "100%",
                            flex: 1,
                            flexDirection: "column",
                            backgroundColor: "white",
                            borderRadius: "30px",
                            boxShadow: "0 2px 2px 2px #d1d1d1",
                            padding: "1rem 1.5rem 1rem 0.5rem"
                        }}
                    >
                        <InvoicesListHeader />
                        {/* <InvoicesList /> */}
                    </Box>
                </Box>
            </Box>
        </>
    )
}
