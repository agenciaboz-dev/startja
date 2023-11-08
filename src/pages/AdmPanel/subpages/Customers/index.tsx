import React, { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { CustomerCard } from "../../../../components/CustomerCard"
import { useIo } from "../../../../hooks/useIo"
import { useCustomer } from "../../../../hooks/useCustomer"
import { Header } from "../../../../components/Header"
import { Toolbar } from "../../../../components/Toolbar"
import AddNewCustomerModal from "./AddNewCustomerModal"

interface CustomersProps {}

export const Customers: React.FC<CustomersProps> = ({}) => {
    const [isAddNewCustomerModalOpen, setAddNewCustomerModalOpen] = useState(false);
    const [emptyCustomersList, setEmptyCustomersList] = useState(false)
    const customers = useCustomer()
    const openNewCustomerModal = () => {
        setAddNewCustomerModalOpen(true)
    }
    const io = useIo()
    useEffect(() => {
        io.emit('customer:list')
    },[])

    return(
        <>
            <Header title="Clientes"/>
            <Toolbar searchPlaceholder="cliente" addButtonPlaceholder="novo cliente" selectList={customers.list} addButtonCallback={openNewCustomerModal} />
            <Box
                sx={{
                    width: "100%"
                }}
            >
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
                                textTransform: "unset",
                                height: "3rem",
                                verticalAlign: "middle",
                                gap: "0.5rem"
                            }}
                            onClick={openNewCustomerModal}
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
                            flexWrap: "wrap",
                            gap: "2rem"
                        }}
                    >
                        {customers.list.map(customer => <CustomerCard buttonColor="primary" key={customer.id} customer={customer} />)}
                    </Box>
                }
            </Box>
            <AddNewCustomerModal open={isAddNewCustomerModalOpen} onClose={() => setAddNewCustomerModalOpen(false)} />
        </>
    )
}