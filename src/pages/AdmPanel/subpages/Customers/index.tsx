import React, { useEffect, useState } from "react"
import { Box, Button, Grid } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { CustomerCard } from "../../../../components/CustomerCard"
import { useIo } from "../../../../hooks/useIo"
import { useCustomersList } from "../../../../hooks/useCustomersList"
import { Header } from "../../../../components/Header"
import { Toolbar } from "../../../../components/Toolbar"
import AddCustomerModal from "./AddCustomerModal"
import { useHeader } from "../../../../hooks/useHeader"
import normalize from "../../../../tools/normalize"

interface CustomersProps {}

export const Customers: React.FC<CustomersProps> = ({}) => {
    // const [emptyCustomersList, setEmptyCustomersList] = useState(true)
    const customers = useCustomersList()
    const header = useHeader()
    const io = useIo()
    const emptyCustomersList = !customers.list.length
    const [isAddCustomerModalOpen, setAddCustomerModalOpen] = useState(false)
    const openCustomerModal = () => {
        setAddCustomerModalOpen(true)
    }

    const [customersList, setCustomersList] = useState(customers.list)

    useEffect(() => {
        setCustomersList(customers.list)
    }, [customers.list])

    const handleSearch = (text: string) => {
        setCustomersList(customers.list.filter((item) => normalize(item.name).includes(text)))
    }

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
                onSearch={handleSearch}
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
                            padding: "2vw",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: "1vw",
                        }}
                    >
                        <h2>Sem clientes cadastrados</h2>
                        <p>Pressione o botão para cadastrar um cliente.</p>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "2vw",
                                textTransform: "unset",
                                height: "3vw",
                                verticalAlign: "middle",
                                gap: "0.5vw",
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
                            width: "100%",
                        }}
                    >
                        <Grid container spacing={2}>
                            {customersList.map((customer) => (
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