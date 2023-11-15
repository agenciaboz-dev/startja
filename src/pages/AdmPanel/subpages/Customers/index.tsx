import React, { useEffect, useState } from "react"
import { Box, Button, Grid } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { CustomerCard } from "../../../../components/CustomerCard"
import { useIo } from "../../../../hooks/useIo"
import { useCustomer } from "../../../../hooks/useCustomer"
import { Header } from "../../../../components/Header"
import { Toolbar } from "../../../../components/Toolbar"
import AddCustomerModal from "./AddCustomerModal"
import { useHeader } from "../../../../hooks/useHeader"

interface CustomersProps {}

export const Customers: React.FC<CustomersProps> = ({}) => {
    // const [emptyCustomersList, setEmptyCustomersList] = useState(true)
    const customers = useCustomer()
    const header = useHeader()
    const emptyCustomersList = !customers.list.length
    const [isAddCustomerModalOpen, setAddCustomerModalOpen] = useState(false)
    const openCustomerModal = () => {
        setAddCustomerModalOpen(true)
    }
    const io = useIo()
    useEffect(() => {
        header.setTitle("Clientes")
        io.emit("customer:list")
    }, [])

    return (
        <>
            <Header />
            <Toolbar
                searchPlaceholder="cliente"
                addButtonPlaceholder="novo cliente"
                selectList={customers.list}
                addButtonCallback={openCustomerModal}
            />
            <Box
                sx={{
                    width: "100%",
                }}
            >
                {emptyCustomersList ? (
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
                        <h2>Sem clientes cadastrados</h2>
                        <p>Pressione o botão para cadastrar um cliente.</p>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "2rem",
                                textTransform: "unset",
                                height: "3rem",
                                verticalAlign: "middle",
                                gap: "0.5rem",
                            }}
                            onClick={openCustomerModal}
                        >
                            <AddOutlinedIcon />
                            Adicionar novo cliente
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            height: "80vh",
                            width: "100%",
                        }}
                    >
                        <Grid container>
                            {customers.list.map((customer) => (
                                <CustomerCard buttonColor="primary" key={customer.id} customer={customer} />
                            ))}
                        </Grid>
                    </Box>
                )}
            </Box>
            <AddCustomerModal open={isAddCustomerModalOpen} onClose={() => setAddCustomerModalOpen(false)} />
        </>
    )
}