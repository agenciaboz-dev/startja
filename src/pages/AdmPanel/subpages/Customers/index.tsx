import React, { useEffect, useState } from "react"
import { Box, Button, Grid, useMediaQuery } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { CustomerCard } from "../../../../components/CustomerCard"
import { useIo } from "../../../../hooks/useIo"
import { Header } from "../../../../components/Header"
import { Toolbar } from "../../../../components/Toolbar"
import AddCustomerModal from "../../../../components/Modals/AddCustomerModal"
import { useHeader } from "../../../../hooks/useHeader"
import normalize from "../../../../tools/normalize"
import { useLocation, useNavigate } from "react-router-dom"
import { useUser } from "../../../../hooks/useUser"

interface CustomersProps {}

export const Customers: React.FC<CustomersProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const user = useUser()
    const header = useHeader()
    const io = useIo()
    const pathname = useLocation().pathname
    const navigate = useNavigate()
    const emptyCustomersList = !user.list.length
    const [isAddCustomerModalOpen, setAddCustomerModalOpen] = useState(false)
    const openCustomerModal = () => {
        setAddCustomerModalOpen(true)
    }

    const [customersList, setCustomersList] = useState(user.list)

    useEffect(() => {
        setCustomersList(user.list)
    }, [user.list])

    const handleSearch = (text: string) => {
        setCustomersList(user.list.filter((item) => normalize(item.name).includes(text)))
    }

    useEffect(() => {
        if (pathname.split("/adm").length < 3) {
            navigate("/adm/clientes")
        }

        header.setTitle("Clientes")
        io.emit("user:list")
    }, [])

    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: isMobile ? "2vw" : "1vw",
                flex: 1
            }}>
            <Header />
            <Toolbar
                searchPlaceholder="cliente"
                addButtonText="Adicionar cliente"
                // selectList={customers.list}
                addButtonCallback={openCustomerModal}
                onSearch={handleSearch}
            />
            <Box
                sx={{
                    height: emptyCustomersList ? "100%" : "",
                    width: "100%"
                }}>
                {emptyCustomersList ? (
                    <Box
                        sx={{
                            height: "100%",
                            width: "100%",
                            padding: "2vw",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: isMobile ? "5vw" : "1vw",
                            textAlign: "center"
                        }}>
                        <h2>Sem clientes cadastrados</h2>
                        <p>Pressione o botão para cadastrar um cliente.</p>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "20px",
                                textTransform: "unset",
                                height: isMobile ? "8vw" : "2vw",
                                verticalAlign: "middle",
                                gap: "0.5vw"
                            }}
                            onClick={openCustomerModal}>
                            <AddOutlinedIcon />
                            Adicionar novo cliente
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            marginTop: isMobile ? "5vw" : "",
                            width: "100%"
                        }}>
                        <Grid container spacing={2}>
                            {customersList.map((customer) => (
                                <CustomerCard buttonColor="primary" key={customer.id} customer={customer} />
                            ))}
                        </Grid>
                    </Box>
                )}
            </Box>
            <AddCustomerModal open={isAddCustomerModalOpen} onClose={() => setAddCustomerModalOpen(false)} />
        </Box>
    )
}